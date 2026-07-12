import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getLesson, saveLessonScore, LESSON_IMG } from "../content.js";

function Quiz({ quiz, lessonId }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done && lessonId) saveLessonScore(lessonId, score, quiz.length);
  }, [done]);

  if (done) {
    const good = score === quiz.length;
    return (
      <div className="qcard" style={{ textAlign: "center" }}>
        <div style={{ fontSize: 40 }}>{good ? "🎉" : "💪"}</div>
        <h3 style={{ fontFamily: "Sora", fontSize: 22, margin: "6px 0" }}>Score : {score}/{quiz.length}</h3>
        <p className="sub">{good ? "Parfait ! Tu maîtrises cette leçon." : "Pas mal ! Refais le quiz pour progresser."}</p>
        <p className="sub" style={{ fontSize: 12.5, marginTop: 4 }}>✓ Progression enregistrée</p>
        <button className="btn btn-primary" style={{ marginTop: 14 }} onClick={() => { setI(0); setPicked(null); setScore(0); setDone(false); }}>Recommencer</button>
      </div>
    );
  }

  const q = quiz[i];
  const choose = (idx) => { if (picked !== null) return; setPicked(idx); if (idx === q.answer) setScore((s) => s + 1); };
  const next = () => { if (i + 1 < quiz.length) { setI(i + 1); setPicked(null); } else setDone(true); };

  return (
    <div className="qcard">
      <div className="qprog">
        <span>Question {i + 1} / {quiz.length}</span>
        <div className="qbar"><i style={{ width: `${(i / quiz.length) * 100}%` }} /></div>
      </div>
      <h3 className="qq">{q.q}</h3>
      <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
        {q.options.map((o, idx) => {
          let st = "qopt";
          if (picked !== null) { if (idx === q.answer) st += " ok"; else if (idx === picked) st += " ko"; }
          return (
            <button key={idx} className={st} onClick={() => choose(idx)} disabled={picked !== null}>
              <span className="qletter">{String.fromCharCode(97 + idx)}</span>{o}
              {picked !== null && idx === q.answer && <span className="qmark">✓</span>}
              {picked !== null && idx === picked && idx !== q.answer && <span className="qmark">✕</span>}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className={`qexp ${picked === q.answer ? "good" : "bad"}`}>
          <b>{picked === q.answer ? "Bonne réponse ! " : "Réponse incorrecte. "}</b>{q.explain}
        </div>
      )}
      {picked !== null && (
        <button className="btn btn-primary btn-block" style={{ marginTop: 14 }} onClick={next}>
          {i + 1 < quiz.length ? "Question suivante" : "Voir mon score"}
        </button>
      )}
    </div>
  );
}

export default function LessonDetail() {
  const { id } = useParams();
  const l = getLesson(id);
  if (!l) {
    return <div className="page"><h2 className="h-lg">Leçon introuvable</h2><p className="sub"><Link to="/lessons" style={{ color: "var(--vert)", fontWeight: 700 }}>Retour aux cours</Link></p></div>;
  }
  return (
    <div className="page">
      <Link to="/lessons" className="back">← Tous les cours</Link>
      <div className="lhero"><img src={LESSON_IMG[l.id]} alt={l.title} /></div>
      <span className={`tag ${l.cls}`} style={{ background: "var(--fond)", color: "var(--gris)" }}>{l.chapter}</span>
      <h2 className="h-lg" style={{ marginTop: 8 }}>{l.title}</h2>
      <p className="sub" style={{ fontSize: 16 }}>{l.intro}</p>

      {l.sections.map((s, i) => (
        <div key={i} style={{ marginTop: 18 }}>
          <h3 style={{ fontFamily: "Sora", fontSize: 18, marginBottom: 6 }}>{s.h}</h3>
          {s.p && <p style={{ color: "var(--gris)", fontSize: 15 }}>{s.p}</p>}
          {s.list && <ul className="clist">{s.list.map((it, j) => <li key={j}><i className="tick">✓</i><span>{it}</span></li>)}</ul>}
        </div>
      ))}

      <h3 style={{ fontFamily: "Sora", fontSize: 20, margin: "28px 0 12px" }}>🧠 Teste tes connaissances</h3>
      <Quiz quiz={l.quiz} lessonId={l.id} />

      <style>{`
        .back{color:var(--gris);font-weight:600;font-size:14px;display:inline-block;margin-bottom:14px}
        .back:hover{color:var(--vert)}
        .lhero{border-radius:18px;overflow:hidden;margin-bottom:16px;box-shadow:var(--sh);height:240px;background:var(--fond)}
        .lhero img{width:100%;height:100%;object-fit:cover;display:block}
        @media(max-width:560px){.lhero{height:180px}}
        .clist{list-style:none;padding:0;margin:8px 0 0}
        .clist li{display:flex;gap:10px;align-items:flex-start;margin-bottom:9px;font-size:15px}
        .clist li .tick{margin-top:2px;flex:none}
        .qcard{background:#fff;border:1px solid var(--bord);border-radius:18px;padding:22px;box-shadow:var(--sh)}
        .qprog{display:flex;flex-direction:column;gap:8px;margin-bottom:10px}
        .qprog span{font-size:12.5px;font-weight:700;color:var(--gris)}
        .qbar{height:6px;background:var(--bord);border-radius:6px;overflow:hidden}
        .qbar i{display:block;height:100%;background:var(--vert);border-radius:6px;transition:.2s}
        .qq{font-family:"Sora";font-size:18px}
        .qopt{display:flex;align-items:center;gap:12px;width:100%;text-align:left;background:var(--fond);border:1.5px solid var(--bord);border-radius:12px;padding:13px 14px;font-size:15px;font-family:inherit;cursor:pointer;transition:.12s;color:var(--ink)}
        .qopt:hover:not(:disabled){border-color:var(--vert)}
        .qopt:disabled{cursor:default}
        .qopt.ok{border-color:var(--vert);background:var(--vert-l)}
        .qopt.ko{border-color:var(--rouge);background:var(--rouge-l)}
        .qletter{width:26px;height:26px;flex:none;border-radius:8px;background:#fff;border:1px solid var(--bord);display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;text-transform:uppercase}
        .qmark{margin-left:auto;font-weight:800}
        .qopt.ok .qmark{color:var(--vert-d)} .qopt.ko .qmark{color:var(--rouge)}
        .qexp{margin-top:14px;padding:13px 15px;border-radius:12px;font-size:14px;line-height:1.5}
        .qexp.good{background:var(--vert-l);color:var(--vert-d)}
        .qexp.bad{background:var(--rouge-l);color:#9b2c2c}
      `}</style>
    </div>
  );
}

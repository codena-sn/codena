import React from "react";
import { Link } from "react-router-dom";
import { LESSONS, getProgress, LESSON_IMG } from "../content.js";

export default function Lessons() {
  const prog = getProgress();
  const doneCount = LESSONS.filter((l) => prog.lessons[l.id]?.done).length;
  const pct = Math.round((doneCount / LESSONS.length) * 100);

  return (
    <div className="page">
      <span className="eyebrow">Le code de la route</span>
      <h2 className="h-lg" style={{ marginTop: 8 }}>Cours de code</h2>
      <p className="sub">Des leçons illustrées, adaptées au Sénégal, avec un quiz à la fin de chacune.</p>

      {/* progression */}
      <div className="pcard">
        <div className="pinfo">
          <b>Ta progression</b>
          <span>{doneCount}/{LESSONS.length} leçons {prog.exam ? `· meilleur examen ${prog.exam.score}/${prog.exam.total}` : ""}</span>
        </div>
        <div className="pbar"><i style={{ width: `${pct}%` }} /></div>
      </div>

      {/* examen blanc */}
      <Link to="/examen" className="exam-cta">
        <div className="exam-ic">⏱</div>
        <div className="exam-tx">
          <b>Examen blanc chronométré</b>
          <span>25 questions · 20 minutes · conditions réelles</span>
        </div>
        <div className="lchev">›</div>
      </Link>

      <h3 style={{ fontFamily: "Sora", fontSize: 15, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--gris)", margin: "26px 4px 12px" }}>Les leçons</h3>

      <div style={{ display: "grid", gap: 14 }}>
        {LESSONS.map((l) => {
          const s = prog.lessons[l.id];
          return (
            <Link to={`/lessons/${l.id}`} key={l.id} className="lcard">
              <div className="lthumb"><img src={LESSON_IMG[l.id]} alt={l.title} loading="lazy" /></div>
              <div className="lbody">
                <span className={`tag ${l.cls}`} style={{ background: "var(--fond)", color: "var(--gris)" }}>{l.chapter}</span>
                <h3>{l.title}</h3>
                <p>
                  {s?.done
                    ? <span className="badge-done">✓ {s.score}/{s.total}</span>
                    : `${l.quiz.length} questions · ${l.sections.length} points clés`}
                </p>
              </div>
              <div className="lchev">›</div>
            </Link>
          );
        })}
      </div>

      <style>{`
        .pcard{background:#fff;border:1px solid var(--bord);border-radius:16px;padding:16px 18px;box-shadow:var(--sh);margin:20px 0 14px}
        .pinfo{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:6px;margin-bottom:10px}
        .pinfo b{font-family:"Sora";font-size:15px}
        .pinfo span{font-size:13px;color:var(--gris)}
        .pbar{height:8px;background:var(--bord);border-radius:6px;overflow:hidden}
        .pbar i{display:block;height:100%;background:var(--vert);border-radius:6px;transition:.3s}
        .exam-cta{display:flex;align-items:center;gap:16px;background:linear-gradient(150deg,var(--vert),var(--vert-d));color:#fff;border-radius:16px;padding:16px 18px;box-shadow:var(--sh-lg);transition:.12s}
        .exam-cta:hover{transform:translateY(-1px)}
        .exam-ic{width:48px;height:48px;flex:none;border-radius:12px;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;font-size:24px}
        .exam-tx{flex:1}
        .exam-tx b{font-family:"Sora";font-size:16px;display:block}
        .exam-tx span{font-size:13px;opacity:.9}
        .exam-cta .lchev{color:#fff;font-size:24px}
        .lcard{display:flex;align-items:center;gap:16px;background:#fff;border:1px solid var(--bord);border-radius:18px;padding:14px;box-shadow:var(--sh);transition:.12s}
        .lcard:hover{border-color:var(--vert);transform:translateY(-1px)}
        .lthumb{width:120px;height:82px;flex:none;border-radius:12px;overflow:hidden;background:var(--fond)}
        .lthumb img{width:100%;height:100%;object-fit:cover;display:block}
        .lbody{flex:1}
        .lbody h3{font-family:"Sora";font-size:17px;margin:6px 0 3px}
        .lbody p{font-size:13px;color:var(--gris)}
        .badge-done{background:var(--vert-l);color:var(--vert-d);font-weight:700;padding:2px 9px;border-radius:20px}
        .lchev{color:var(--gris);font-size:24px;padding-right:6px}
        @media(max-width:560px){.lthumb{width:88px;height:64px}.lbody h3{font-size:15px}}
      `}</style>
    </div>
  );
}

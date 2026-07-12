// Contenu pédagogique Codéna — code de la route & conduite (Sénégal)
// Illustrations SVG sur mesure (panneaux officiels en vectoriel, sans droits).

const svgWrap = (inner, bg = "#E8F7F0") =>
  `<svg viewBox="0 0 320 170" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block">
     <rect width="320" height="170" rx="18" fill="${bg}"/>${inner}</svg>`;

const dangerTri = (x, y, s = 1) =>
  `<g transform="translate(${x},${y}) scale(${s})"><polygon points="30,4 56,50 4,50" fill="#fff" stroke="#F04438" stroke-width="5" stroke-linejoin="round"/><text x="30" y="44" font-size="30" font-family="Arial" font-weight="bold" text-anchor="middle" fill="#0C1E17">!</text></g>`;
const interdit = (x, y, s = 1) =>
  `<g transform="translate(${x},${y}) scale(${s})"><circle cx="28" cy="28" r="24" fill="#fff" stroke="#F04438" stroke-width="5"/><rect x="6" y="24" width="44" height="8" rx="2" fill="#F04438" transform="rotate(-45 28 28)"/></g>`;
const oblig = (x, y, s = 1) =>
  `<g transform="translate(${x},${y}) scale(${s})"><circle cx="28" cy="28" r="24" fill="#1D4ED8"/><path d="M28 14 L28 42 M28 14 L20 24 M28 14 L36 24" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
const car = (x, y, color = "#0E9F6E", s = 1) =>
  `<g transform="translate(${x},${y}) scale(${s})"><path d="M4 30 L14 30 L22 16 L52 16 L60 30 L74 30 L74 44 L4 44 Z" fill="${color}"/><rect x="26" y="20" width="22" height="12" rx="2" fill="#EAF7F0"/><circle cx="20" cy="46" r="8" fill="#0C1E17"/><circle cx="60" cy="46" r="8" fill="#0C1E17"/></g>`;
const speedSign = (x, y, n = "50") =>
  `<g transform="translate(${x},${y})"><circle cx="30" cy="30" r="27" fill="#fff" stroke="#F04438" stroke-width="6"/><text x="30" y="40" font-size="26" font-family="Arial" font-weight="bold" text-anchor="middle" fill="#0C1E17">${n}</text></g>`;
const stopSign = (x, y) =>
  `<g transform="translate(${x},${y})"><polygon points="18,2 42,2 58,18 58,42 42,58 18,58 2,42 2,18" fill="#F04438"/><text x="30" y="38" font-size="15" font-family="Arial" font-weight="bold" text-anchor="middle" fill="#fff">STOP</text></g>`;
const pSign = (x, y) =>
  `<g transform="translate(${x},${y})"><rect x="0" y="0" width="56" height="56" rx="8" fill="#1D4ED8"/><text x="28" y="42" font-size="40" font-family="Arial" font-weight="bold" text-anchor="middle" fill="#fff">P</text></g>`;
const cross = (x, y) =>
  `<g transform="translate(${x},${y})"><rect x="0" y="0" width="60" height="60" rx="10" fill="#fff" stroke="#F04438" stroke-width="3"/><rect x="24" y="12" width="12" height="36" fill="#F04438"/><rect x="12" y="24" width="36" height="12" fill="#F04438"/></g>`;
const headlight = (x, y) =>
  `<g transform="translate(${x},${y})"><circle cx="26" cy="26" r="20" fill="#FBBF24"/><g stroke="#FBBF24" stroke-width="6" stroke-linecap="round"><line x1="52" y1="14" x2="86" y2="6"/><line x1="52" y1="26" x2="90" y2="26"/><line x1="52" y1="38" x2="86" y2="46"/></g></g>`;

export const LESSONS = [
  {
    id: "signalisation", title: "La signalisation routière", chapter: "Signalisation", cls: "g",
    svg: svgWrap(`${dangerTri(40, 45)} ${interdit(140, 55)} ${oblig(230, 55)}`),
    intro: "La signalisation permet à tous les usagers de comprendre les mêmes règles. Elle se lit de haut en bas et de gauche à droite, et prime sur les règles générales quand elle est présente.",
    sections: [
      { h: "Les panneaux de danger", p: "Triangulaires, à fond blanc et bordure rouge, ils annoncent un danger environ 150 m avant : virage, dos-d'âne (ralentisseur, très fréquent à l'entrée des villages), passage piétons, école, intersection, passage d'animaux, travaux." },
      { h: "Les panneaux d'interdiction", p: "Ronds, à fond blanc et bordure rouge. Ils interdisent un comportement (sens interdit, interdiction de dépasser, limitation de vitesse, stationnement interdit) jusqu'à la prochaine intersection ou un panneau de fin." },
      { h: "Les panneaux d'obligation", p: "Ronds, à fond bleu. Ils imposent un comportement : direction obligatoire, voie réservée, vitesse minimale." },
      { h: "Feux et marquages", list: ["Feu rouge : arrêt ; jaune fixe : s'arrêter si possible ; vert : passer si la voie est libre.", "Ligne continue : ne jamais franchir. Ligne discontinue : franchissement autorisé avec prudence.", "Au Sénégal, les marquages sont parfois effacés : gardez votre droite."] },
    ],
    quiz: [
      { q: "Un panneau triangulaire à bordure rouge annonce :", options: ["Une obligation", "Un danger", "Une direction"], answer: 1, explain: "Le triangle à bordure rouge signale un danger à venir." },
      { q: "Un panneau rond à fond bleu indique :", options: ["Une interdiction", "Une obligation", "Un danger"], answer: 1, explain: "Le rond bleu impose un comportement : c'est une obligation." },
      { q: "Une ligne continue au sol :", options: ["Peut être franchie pour dépasser", "Ne doit jamais être franchie", "Autorise le stationnement"], answer: 1, explain: "On ne franchit ni ne chevauche jamais une ligne continue." },
      { q: "Au feu jaune fixe, je dois :", options: ["Accélérer", "M'arrêter si je le peux sans danger", "Continuer sans ralentir"], answer: 1, explain: "Le jaune fixe impose de s'arrêter si l'arrêt est possible sans danger." },
    ],
  },
  {
    id: "priorites", title: "Priorités et intersections", chapter: "Priorités", cls: "y",
    svg: svgWrap(`${stopSign(50, 55)} <g stroke="#0C1E17" stroke-width="4" fill="none"><path d="M170 20 L170 150 M120 85 L250 85"/></g> <path d="M250 85 l-14 -7 l0 14 z" fill="#0C1E17"/> <path d="M170 20 l-7 14 l14 0 z" fill="#0C1E17"/>`, "#FEF3D6"),
    intro: "La majorité des accidents en ville surviennent aux intersections. Savoir qui passe en premier est essentiel.",
    sections: [
      { h: "La priorité à droite", p: "À défaut de signalisation, on cède le passage au véhicule qui vient de sa droite." },
      { h: "Cédez le passage et STOP", list: ["« Cédez le passage » (triangle pointe en bas) : ralentir et laisser passer, sans forcément s'arrêter.", "« STOP » : arrêt complet obligatoire, roues immobiles, puis repartir quand c'est libre."] },
      { h: "Le rond-point (giratoire)", p: "On cède le passage aux véhicules déjà engagés dans l'anneau, on se place à l'avance selon sa sortie, et on met le clignotant droit pour sortir." },
      { h: "Cas particuliers", p: "En sortant d'un garage ou d'une station, on cède le passage. On laisse toujours passer les véhicules prioritaires en intervention (ambulance, pompiers, police)." },
    ],
    quiz: [
      { q: "Sans signalisation, je cède le passage :", options: ["À ma gauche", "À ma droite", "À personne"], answer: 1, explain: "En l'absence de signalisation, priorité à droite." },
      { q: "Au panneau STOP, je dois :", options: ["Ralentir seulement", "M'arrêter complètement puis repartir si c'est libre", "Klaxonner"], answer: 1, explain: "Le STOP impose un arrêt complet, roues immobiles." },
      { q: "Dans un rond-point, la priorité est :", options: ["À celui qui entre", "Aux véhicules déjà engagés", "Au plus rapide"], answer: 1, explain: "On cède le passage aux véhicules déjà dans l'anneau." },
    ],
  },
  {
    id: "vitesse", title: "Vitesse et distances de sécurité", chapter: "Circulation", cls: "r",
    svg: svgWrap(`${speedSign(40, 55)} ${car(150, 70)} ${car(240, 70, "#0C1E17", 0.7)}`, "#FDE7E5"),
    intro: "La vitesse doit toujours être adaptée aux conditions : pluie, poussière, nuit, trafic, présence de piétons ou de charrettes.",
    sections: [
      { h: "Les limitations au Sénégal", list: ["En agglomération : 50 km/h", "Sur route (hors agglomération) : 90 km/h", "Sur autoroute : 110 à 130 km/h selon la signalisation"] },
      { h: "La distance de sécurité", p: "Règle des « deux secondes » sur route sèche : au passage d'un point fixe par le véhicule devant, comptez « mille un, mille deux ». Doublez la distance sur route mouillée." },
      { h: "La distance d'arrêt", p: "Distance d'arrêt = distance de réaction + distance de freinage. Quand la vitesse double, la distance de freinage est environ multipliée par quatre. Fatigue, alcool et téléphone rallongent la distance de réaction." },
    ],
    quiz: [
      { q: "En agglomération, la vitesse maximale est en général :", options: ["30 km/h", "50 km/h", "90 km/h"], answer: 1, explain: "50 km/h en agglomération sauf indication contraire." },
      { q: "Hors agglomération (route), la vitesse maximale est :", options: ["70 km/h", "90 km/h", "110 km/h"], answer: 1, explain: "90 km/h sur route sauf panneau." },
      { q: "Sur route mouillée, la distance de sécurité doit être :", options: ["Réduite", "Au moins doublée", "Inchangée"], answer: 1, explain: "L'adhérence baisse : on double au moins la distance." },
      { q: "Quand la vitesse double, la distance de freinage est environ :", options: ["Doublée", "Multipliée par quatre", "Identique"], answer: 1, explain: "La distance de freinage varie avec le carré de la vitesse." },
    ],
  },
  {
    id: "depassement", title: "Croisement et dépassement", chapter: "Circulation", cls: "g",
    svg: svgWrap(`<rect x="20" y="70" width="280" height="34" fill="#0C1E17"/><g fill="#FBBF24"><rect x="40" y="85" width="24" height="5"/><rect x="90" y="85" width="24" height="5"/><rect x="140" y="85" width="24" height="5"/><rect x="190" y="85" width="24" height="5"/><rect x="240" y="85" width="24" height="5"/></g>${car(60, 92, "#0E9F6E", 0.7)}${car(150, 40, "#F04438", 0.7)}`),
    intro: "Le dépassement est une manœuvre à risque : elle demande visibilité, anticipation et signalisation.",
    sections: [
      { h: "Le croisement", p: "On croise par la droite. Sur route étroite ou piste, ralentir et serrer à droite ; si un obstacle occupe une voie, celui qui l'a de son côté cède le passage. La nuit, passer en feux de croisement." },
      { h: "Le dépassement", p: "On dépasse par la gauche. Avant : vérifier les rétroviseurs et l'angle mort, s'assurer que la voie est libre, mettre le clignotant gauche. Après : se rabattre à droite en signalant, sans se rabattre trop tôt." },
      { h: "Quand c'est interdit", list: ["Sur ligne continue.", "En virage ou sommet de côte sans visibilité.", "Aux passages piétons et souvent à l'approche des intersections."] },
    ],
    quiz: [
      { q: "On dépasse normalement :", options: ["Par la droite", "Par la gauche après vérification", "N'importe comment"], answer: 1, explain: "Le dépassement se fait par la gauche, après contrôle." },
      { q: "Quand je suis dépassé, je dois :", options: ["Accélérer", "Serrer à droite sans accélérer", "Me déporter à gauche"], answer: 1, explain: "On facilite le dépassement en serrant à droite sans accélérer." },
      { q: "Le dépassement est interdit :", options: ["Sur ligne discontinue", "Sur ligne continue", "En ligne droite dégagée"], answer: 1, explain: "La ligne continue interdit le dépassement." },
    ],
  },
  {
    id: "conducteur", title: "Le conducteur : alcool et vigilance", chapter: "Facteurs humains", cls: "r",
    svg: svgWrap(`<g transform="translate(120,35)"><path d="M20 4 h40 l-4 30 a16 16 0 0 1 -32 0 z" fill="#fff" stroke="#0C1E17" stroke-width="4"/><rect x="36" y="60" width="8" height="24" fill="#0C1E17"/><rect x="24" y="84" width="32" height="6" fill="#0C1E17"/></g><circle cx="140" cy="70" r="60" fill="none" stroke="#F04438" stroke-width="8"/><line x1="100" y1="30" x2="180" y2="110" stroke="#F04438" stroke-width="8"/>`, "#FDE7E5"),
    intro: "Le conducteur est le premier facteur de sécurité. Son état physique et mental détermine sa capacité à percevoir, décider et réagir.",
    sections: [
      { h: "L'alcool", p: "Le taux d'alcoolémie maximal autorisé au Sénégal est de 0,5 g/l de sang. L'alcool réduit les réflexes, rétrécit le champ visuel et altère le jugement. Le seul comportement sûr : ne pas boire avant de conduire." },
      { h: "La fatigue", p: "La fatigue allonge le temps de réaction. Sur les longs trajets, faites une pause d'au moins 15 minutes toutes les deux heures. Au moindre signe de somnolence, arrêtez-vous." },
      { h: "Les distracteurs", p: "Téléphoner ou écrire en conduisant détourne l'attention et le regard. Réglez le GPS avant de partir, utilisez un dispositif mains libres ou arrêtez-vous." },
    ],
    quiz: [
      { q: "Le taux d'alcool maximal autorisé au Sénégal est :", options: ["0,2 g/l", "0,5 g/l", "0,8 g/l"], answer: 1, explain: "La limite légale est de 0,5 g/l de sang." },
      { q: "En cas de somnolence sur un long trajet, je dois :", options: ["Accélérer", "M'arrêter pour me reposer", "Continuer longtemps"], answer: 1, explain: "Le seul remède efficace est le repos : on s'arrête." },
      { q: "Téléphoner en tenant l'appareil en conduisant :", options: ["Est autorisé en ville", "Est interdit et dangereux", "Est autorisé à faible vitesse"], answer: 1, explain: "C'est interdit et cela multiplie fortement le risque d'accident." },
    ],
  },
  {
    id: "vehicule", title: "Le véhicule et les documents", chapter: "Véhicule", cls: "y",
    svg: svgWrap(`${car(30, 65, "#0E9F6E")}<g transform="translate(150,40)"><rect x="0" y="0" width="60" height="80" rx="6" fill="#fff" stroke="#0C1E17" stroke-width="3"/><rect x="10" y="14" width="40" height="6" fill="#0E9F6E"/><rect x="10" y="30" width="40" height="5" fill="#5A6B63"/><rect x="10" y="42" width="40" height="5" fill="#5A6B63"/><rect x="10" y="54" width="26" height="5" fill="#5A6B63"/></g><g transform="translate(228,52)"><rect x="0" y="0" width="52" height="66" rx="6" fill="#FBBF24" stroke="#0C1E17" stroke-width="3"/><text x="26" y="40" font-size="24" text-anchor="middle" font-family="Arial" font-weight="bold" fill="#0C1E17">A</text></g>`, "#FEF3D6"),
    intro: "Un véhicule en bon état et des documents en règle sont indispensables pour conduire en sécurité et éviter les sanctions.",
    sections: [
      { h: "Les documents obligatoires", list: ["Le permis de conduire de la catégorie du véhicule.", "La carte grise (certificat d'immatriculation).", "L'assurance — la « carte jaune » visible sur le pare-brise.", "Le certificat de visite technique en cours de validité."] },
      { h: "La visite technique", p: "Supervisée par l'agence nationale des transports, elle vérifie freins, éclairage, pneus, direction et émissions ; en général annuelle. Un véhicule non conforme s'expose à une amende, voire à l'immobilisation." },
      { h: "Les vérifications", list: ["Pneus : pression (à froid) et usure ; un pneu lisse est dangereux, surtout sous la pluie.", "Freins et éclairage : contrôler régulièrement.", "Niveaux : huile, liquide de refroidissement, liquide de frein."] },
    ],
    quiz: [
      { q: "La « carte jaune » sur le pare-brise atteste :", options: ["De la visite technique", "De l'assurance", "Du péage"], answer: 1, explain: "La carte jaune prouve que le véhicule est assuré." },
      { q: "La visite technique vérifie notamment :", options: ["La couleur du véhicule", "Freins, éclairage, pneus, émissions", "Le niveau de carburant"], answer: 1, explain: "Elle contrôle les organes de sécurité et les émissions." },
      { q: "Un pneu lisse (usé) :", options: ["Améliore l'adhérence", "Est dangereux surtout sous la pluie", "Est sans importance"], answer: 1, explain: "Un pneu usé perd son adhérence, surtout sur route mouillée." },
    ],
  },
  {
    id: "securite", title: "Sécurité et usagers vulnérables", chapter: "Sécurité", cls: "g",
    svg: svgWrap(`<g transform="translate(60,40)"><circle cx="20" cy="16" r="12" fill="#0C1E17"/><rect x="14" y="30" width="12" height="40" rx="5" fill="#0C1E17"/><rect x="4" y="40" width="12" height="6" rx="3" fill="#0C1E17"/><rect x="24" y="40" width="12" height="6" rx="3" fill="#0C1E17"/><rect x="14" y="66" width="6" height="30" fill="#0C1E17"/><rect x="22" y="66" width="6" height="30" fill="#0C1E17"/></g><g transform="translate(170,44)"><rect x="0" y="0" width="90" height="80" rx="10" fill="#fff" stroke="#0E9F6E" stroke-width="4"/><path d="M14 20 L76 60 M76 20 L14 60" stroke="#0E9F6E" stroke-width="8" stroke-linecap="round"/><text x="45" y="76" font-size="12" text-anchor="middle" font-family="Arial" fill="#0C1E17">ceinture</text></g>`),
    intro: "La route est partagée. Le conducteur doit protéger les plus fragiles et veiller à la sécurité de tous les occupants.",
    sections: [
      { h: "Les protections", list: ["Ceinture : obligatoire à l'avant et à l'arrière.", "Casque : obligatoire pour conducteur et passager de moto (motos « Jakarta » comprises).", "Enfants : installés selon leur âge et leur taille, jamais sur les genoux à l'avant."] },
      { h: "Les usagers vulnérables", p: "Piétons, cyclistes et deux-roues sont les plus exposés. Priorité aux passages, ralentir près des marchés, écoles et arrêts, et vérifier les angles morts avant de tourner." },
      { h: "Partager la route", p: "Cars rapides et bus s'arrêtent brusquement : gardez vos distances. Charrettes et animaux sont lents et peu visibles la nuit : ralentissez et dépassez avec une large marge." },
    ],
    quiz: [
      { q: "La ceinture est obligatoire :", options: ["Seulement à l'avant", "À l'avant et à l'arrière", "Seulement sur autoroute"], answer: 1, explain: "La ceinture est obligatoire à toutes les places." },
      { q: "Le casque à moto est obligatoire :", options: ["Pour le conducteur seulement", "Pour le conducteur et le passager", "La nuit seulement"], answer: 1, explain: "Conducteur ET passager doivent porter le casque." },
      { q: "Avant de tourner à droite en ville, je vérifie surtout :", options: ["Le ciel", "L'angle mort (deux-roues, piétons)", "Rien"], answer: 1, explain: "Les deux-roues se glissent dans l'angle mort : on le contrôle." },
    ],
  },
  {
    id: "conditions", title: "Conduire au Sénégal : conditions particulières", chapter: "Conditions", cls: "y",
    svg: svgWrap(`<circle cx="70" cy="50" r="22" fill="#FBBF24"/><g stroke="#FBBF24" stroke-width="5" stroke-linecap="round"><line x1="70" y1="14" x2="70" y2="4"/><line x1="70" y1="96" x2="70" y2="86"/><line x1="34" y1="50" x2="24" y2="50"/><line x1="116" y1="50" x2="106" y2="50"/></g><g transform="translate(150,30)"><ellipse cx="60" cy="30" rx="46" ry="24" fill="#94A3B8"/><g stroke="#1D4ED8" stroke-width="4" stroke-linecap="round"><line x1="34" y1="60" x2="28" y2="76"/><line x1="60" y1="60" x2="54" y2="76"/><line x1="86" y1="60" x2="80" y2="76"/></g></g><rect x="20" y="120" width="280" height="20" fill="#0C1E17"/>`, "#FEF3D6"),
    intro: "Le climat et les routes du Sénégal imposent des adaptations : hivernage, poussière, nuit et pistes.",
    sections: [
      { h: "L'hivernage (pluie)", p: "Chaussée glissante, visibilité réduite, rues inondées. Réduisez la vitesse, augmentez les distances, allumez les feux de croisement et évitez les flaques profondes (nids-de-poule cachés)." },
      { h: "Poussière (harmattan) et nuit", p: "Par visibilité réduite : ralentir, feux de croisement/brouillard, augmenter les distances. La nuit, beaucoup d'usagers sont mal éclairés (piétons, charrettes) : réglez votre vitesse pour vous arrêter dans la distance éclairée." },
      { h: "Les pistes", p: "Sur latérite ou sable, l'adhérence est faible : conduite souple, sans freinages ni coups de volant brusques, vitesse fortement réduite. Méfiez-vous de la « tôle ondulée »." },
    ],
    quiz: [
      { q: "Pendant l'hivernage (pluie), je dois :", options: ["Rouler plus vite", "Ralentir et augmenter les distances", "Éteindre mes feux"], answer: 1, explain: "Adhérence et visibilité baissent : on ralentit et on augmente les distances." },
      { q: "Par forte poussière (harmattan), j'utilise :", options: ["Les pleins phares", "Les feux de croisement / brouillard", "Aucun feu"], answer: 1, explain: "Les pleins phares éblouissent dans la poussière ; on utilise les codes/brouillard." },
      { q: "Sur une piste sablonneuse, je dois :", options: ["Freiner et tourner brusquement", "Conduire souplement, vitesse réduite", "Accélérer fortement"], answer: 1, explain: "Faible adhérence : souplesse et vitesse réduite." },
    ],
  },
  {
    id: "eclairage", title: "L'éclairage du véhicule", chapter: "Véhicule", cls: "y",
    svg: svgWrap(`${headlight(60, 55)}${car(180, 70, "#0E9F6E")}`, "#FEF3D6"),
    intro: "Bien utiliser ses feux, c'est voir et être vu. Chaque feu a un usage précis.",
    sections: [
      { h: "Quel feu, quand ?", list: ["Feux de position : pour être vu, à l'arrêt ou en complément.", "Feux de croisement (codes) : la nuit, sous la pluie, dans la poussière, et au croisement pour ne pas éblouir.", "Feux de route (pleins phares) : la nuit hors agglomération, voie libre ; repasser en codes dès qu'un véhicule approche.", "Feux de brouillard : visibilité fortement réduite."] },
      { h: "Détresse et clignotants", p: "Les feux de détresse signalent une immobilisation dangereuse ou un ralentissement brutal. Les clignotants et feux stop servent à signaler ses intentions et ses freinages." },
      { h: "Le klaxon", p: "Il sert à prévenir d'un danger immédiat, pas à exprimer l'impatience. En agglomération son usage est limité ; la nuit, on préfère l'appel de phares." },
    ],
    quiz: [
      { q: "La nuit hors agglomération, voie libre, j'utilise :", options: ["Les feux de position", "Les feux de route", "Rien"], answer: 1, explain: "Les feux de route éclairent loin quand la voie est libre ; on repasse en codes au croisement." },
      { q: "Au croisement d'un véhicule la nuit, je passe :", options: ["En pleins phares", "En feux de croisement (codes)", "En feux de détresse"], answer: 1, explain: "On passe en codes pour ne pas éblouir l'autre conducteur." },
      { q: "Le klaxon sert :", options: ["À exprimer l'impatience", "À prévenir d'un danger immédiat", "À saluer"], answer: 1, explain: "Son usage est réservé à la prévention d'un danger." },
    ],
  },
  {
    id: "stationnement", title: "L'arrêt et le stationnement", chapter: "Circulation", cls: "g",
    svg: svgWrap(`${pSign(50, 55)}${car(160, 70, "#0E9F6E")}`),
    intro: "L'arrêt est momentané (conducteur aux commandes) ; le stationnement est prolongé. On se range à droite, sans gêner.",
    sections: [
      { h: "Où c'est interdit", list: ["Sur ou juste avant un passage piéton ; en double file ; dans un virage ; au sommet d'une côte ; sur un pont.", "Devant une bouche d'incendie, une entrée de garage, un arrêt de transport.", "Sur les voies réservées et là où un panneau l'interdit."] },
      { h: "Stationner en pente et de nuit", p: "En pente, braquez les roues vers le trottoir et serrez le frein à main. La nuit, hors zone éclairée, laissez les feux de position allumés pour être vu." },
      { h: "Repartir en sécurité", p: "Contrôlez les rétroviseurs et l'angle mort, signalez avec le clignotant, et insérez-vous quand c'est sûr. À Dakar, le stationnement gênant peut entraîner l'enlèvement du véhicule." },
    ],
    quiz: [
      { q: "Je peux stationner :", options: ["Sur un passage piéton", "À droite sans gêner la circulation", "En double file"], answer: 1, explain: "On se range à droite sans gêner ni les véhicules ni les piétons." },
      { q: "En stationnement en pente, je dois :", options: ["Laisser les roues droites", "Braquer les roues et serrer le frein à main", "Laisser au point mort sans frein"], answer: 1, explain: "Braquer les roues évite que le véhicule ne dévale la pente." },
      { q: "La nuit, à l'arrêt hors zone éclairée, j'allume :", options: ["Les pleins phares", "Les feux de position", "Rien"], answer: 1, explain: "Les feux de position permettent d'être vu sans éblouir." },
    ],
  },
  {
    id: "secours", title: "Accidents et premiers secours", chapter: "Sécurité", cls: "r",
    svg: svgWrap(`${cross(90, 55)}<g transform="translate(180,60)"><rect x="0" y="0" width="70" height="46" rx="8" fill="#0C1E17"/><text x="35" y="32" font-size="22" text-anchor="middle" font-family="Arial" font-weight="bold" fill="#fff">18</text></g>`, "#FDE7E5"),
    intro: "Face à un accident, une bonne réaction peut sauver des vies. La démarche : Protéger, Alerter, Secourir (PAS).",
    sections: [
      { h: "Protéger", p: "Baliser les lieux (triangle, feux de détresse), couper le contact des véhicules, éviter le sur-accident." },
      { h: "Alerter", p: "Appeler les secours : Sapeurs-pompiers 18, Police 17. Indiquer le lieu précis, le nombre de blessés et leur état." },
      { h: "Secourir", list: ["Ne pas déplacer un blessé sauf danger immédiat (incendie).", "Comprimer une plaie qui saigne avec un tissu propre.", "Personne inconsciente qui respire : la mettre sur le côté (position latérale de sécurité).", "Ne jamais donner à boire à un blessé."] },
    ],
    quiz: [
      { q: "En cas d'accident, la bonne démarche est :", options: ["Secourir, Alerter, Protéger", "Protéger, Alerter, Secourir", "Partir vite"], answer: 1, explain: "On protège d'abord, on alerte, puis on secourt (PAS)." },
      { q: "Le numéro des sapeurs-pompiers au Sénégal est :", options: ["17", "18", "15"], answer: 1, explain: "Les sapeurs-pompiers, c'est le 18 (police : 17)." },
      { q: "Une personne inconsciente qui respire doit être mise :", options: ["Sur le dos", "En position latérale de sécurité", "Assise"], answer: 1, explain: "La position latérale de sécurité évite l'étouffement." },
    ],
  },
  {
    id: "reglementation", title: "Règles, infractions et sanctions", chapter: "Réglementation", cls: "r",
    svg: svgWrap(`${dangerTri(50, 50)}<g transform="translate(150,45)"><rect x="0" y="0" width="120" height="78" rx="8" fill="#fff" stroke="#0C1E17" stroke-width="3"/><rect x="14" y="16" width="60" height="8" fill="#F04438"/><rect x="14" y="34" width="90" height="6" fill="#5A6B63"/><rect x="14" y="48" width="90" height="6" fill="#5A6B63"/><text x="90" y="70" font-size="16" text-anchor="middle" font-family="Arial" font-weight="bold" fill="#F04438">AMENDE</text></g>`, "#FDE7E5"),
    intro: "Le non-respect du code entraîne des sanctions. Le nouveau conducteur doit être particulièrement prudent.",
    sections: [
      { h: "Les infractions les plus sanctionnées", list: ["Excès de vitesse.", "Alcool au-delà de 0,5 g/l.", "Non-port de la ceinture ou du casque.", "Franchissement de feu rouge ou de STOP.", "Téléphone au volant.", "Conduite sans assurance ou sans permis."] },
      { h: "Les sanctions", p: "Elles vont de l'amende à l'immobilisation du véhicule, la suspension ou le retrait du permis, avec des peines aggravées en cas de récidive ou d'accident corporel." },
      { h: "Le contrôle routier", p: "Présentez calmement permis, carte grise, assurance et visite technique. Des documents en règle et une attitude coopérative facilitent le contrôle." },
    ],
    quiz: [
      { q: "Conduire sans assurance :", options: ["Est toléré en ville", "Est illégal et lourdement sanctionné", "Est autorisé la journée"], answer: 1, explain: "L'assurance est obligatoire ; rouler sans est une infraction grave." },
      { q: "Le nouveau conducteur (période probatoire) doit :", options: ["Rouler plus vite", "Être particulièrement prudent", "Ignorer les limitations"], answer: 1, explain: "Ses fautes sont plus lourdement sanctionnées : prudence." },
      { q: "Lors d'un contrôle, je présente :", options: ["Seulement le permis", "Permis, carte grise, assurance, visite technique", "Aucun document"], answer: 1, explain: "Tous les documents du véhicule et du conducteur peuvent être exigés." },
    ],
  },
];

export function getLesson(id) {
  return LESSONS.find((l) => l.id === id);
}

// --- Vraies photos sous licence (Pexels, usage commercial autorisé) ---
const PX = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900&h=470&fit=crop`;
export const LESSON_IMG = {
  signalisation: PX(33893298),
  priorites: PX(34095344),
  vitesse: PX(32232419),
  depassement: PX(15121717),
  conducteur: PX(37421212),
  vehicule: PX(32667397),
  securite: PX(5835435),
  conditions: PX(29029741),
  eclairage: PX(30546867),
  stationnement: PX(36443561),
  secours: PX(6129679),
  reglementation: PX(27137059),
};

// --- Réservoir de questions pour l'examen blanc (toutes les questions des leçons) ---
export const EXAM_POOL = LESSONS.flatMap((l) => l.quiz.map((q) => ({ ...q, chapter: l.chapter })));

export function pickExam(n = 25) {
  const pool = [...EXAM_POOL];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(n, pool.length));
}

// --- Progression de l'élève (stockée dans le navigateur) ---
const PKEY = "codena_progress";
export function getProgress() {
  try { return JSON.parse(localStorage.getItem(PKEY)) || { lessons: {}, exam: null }; }
  catch { return { lessons: {}, exam: null }; }
}
export function saveLessonScore(id, score, total) {
  const p = getProgress();
  const prev = p.lessons[id]?.score || 0;
  p.lessons[id] = { score: Math.max(prev, score), total, done: true };
  try { localStorage.setItem(PKEY, JSON.stringify(p)); } catch {}
}
export function saveExamScore(score, total) {
  const p = getProgress();
  if (!p.exam || score > p.exam.score) p.exam = { score, total, date: Date.now() };
  try { localStorage.setItem(PKEY, JSON.stringify(p)); } catch {}
}

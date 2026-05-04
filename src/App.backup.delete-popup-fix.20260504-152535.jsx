import { useMemo, useState } from "react";
import "./App.css";

const medicijnSuggesties = [
  "Paracetamol", "Ibuprofen", "Naproxen", "Diclofenac", "Celecoxib",
  "Tramadol", "Oxycodon", "Morfine", "Fentanyl", "Codeïne", "Buprenorfine",

  "Amlodipine", "Candesartan", "Losartan", "Valsartan", "Irbesartan",
  "Enalapril", "Lisinopril", "Perindopril", "Ramipril",
  "Metoprolol", "Bisoprolol", "Atenolol", "Carvedilol",
  "Furosemide", "Bumetanide", "Hydrochloorthiazide", "Spironolacton",
  "Diltiazem", "Verapamil", "Digoxine", "Isosorbidedinitraat",

  "Atorvastatine", "Simvastatine", "Rosuvastatine", "Pravastatine",
  "Ezetimib",

  "Metformine", "Gliclazide", "Insuline", "Insuline glargine",
  "Insuline aspart", "Empagliflozine", "Dapagliflozine",
  "Semaglutide", "Liraglutide", "Sitagliptine",

  "Omeprazol", "Pantoprazol", "Esomeprazol", "Lansoprazol",
  "Famotidine", "Macrogol", "Lactulose", "Bisacodyl", "Loperamide",
  "Metoclopramide", "Domperidon", "Ondansetron",

  "Duloxetine", "Amitriptyline", "Nortriptyline", "Sertraline",
  "Citalopram", "Escitalopram", "Fluoxetine", "Paroxetine",
  "Venlafaxine", "Mirtazapine", "Bupropion", "Trazodon",

  "Lithium", "Aripiprazol", "Quetiapine", "Olanzapine",
  "Risperidon", "Haloperidol", "Clozapine", "Paliperidon",
  "Lamotrigine", "Valproïnezuur", "Carbamazepine",

  "Oxazepam", "Temazepam", "Lorazepam", "Diazepam", "Alprazolam",
  "Zolpidem", "Zopiclon",

  "Baclofen", "Tolperison", "Tizanidine", "Gabapentine",
  "Pregabaline", "Levodopa", "Pramipexol", "Ropinirol",

  "Levothyroxine", "Thiamazol", "Prednisolon", "Dexamethason",
  "Hydrocortison",

  "Salbutamol", "Formoterol", "Salmeterol", "Budesonide",
  "Fluticason", "Tiotropium", "Ipratropium", "Montelukast",

  "Apixaban", "Rivaroxaban", "Dabigatran", "Edoxaban",
  "Acenocoumarol", "Fenprocoumon", "Clopidogrel",
  "Acetylsalicylzuur", "Carbasalaatcalcium",

  "Amoxicilline", "Amoxicilline clavulaanzuur", "Doxycycline",
  "Azitromycine", "Claritromycine", "Ciprofloxacine",
  "Nitrofurantoïne", "Fosfomycine", "Metronidazol", "Flucloxacilline",

  "Cetirizine", "Loratadine", "Desloratadine", "Fexofenadine",
  "Levocetirizine",

  "Ascorbinezuur", "Colecalciferol", "Calciumcarbonaat",
  "Foliumzuur", "Cyanocobalamine", "Ferrofumaraat",

  "Allopurinol", "Colchicine", "Tamsulosine", "Finasteride",
  "Solifenacine", "Oxybutynine",

  "Estradiol", "Progesteron", "Levonorgestrel", "Ethinylestradiol",

  "Aciclovir", "Valaciclovir", "Fluconazol", "Miconazol",
  "Terbinafine"
];

const startPersonen = [
  {
    naam: "Moeder",
    leeftijd: "86",
    rol: "Mantelzorg voorbeeld",
    contact: "Familie / arts / apotheek",
    notities: "Let op sufheid, duizeligheid, slikproblemen, vallen en veranderingen in gedrag.",
    medicijnen: [
      { naam: "Amlodipine", sterkte: "5 mg", moment: "Ochtend", reden: "Bloeddruk" },
      { naam: "Candesartan", sterkte: "4 mg", moment: "Ochtend", reden: "Bloeddruk / nieren" },
      { naam: "Duloxetine", sterkte: "60 mg", moment: "Ochtend", reden: "Zenuwpijn / stemming" },
      { naam: "Baclofen", sterkte: "2,5 mg", moment: "Volgens voorschrift", reden: "Spierspanning" },
      { naam: "Oxycodon", sterkte: "2 mg", moment: "Volgens voorschrift", reden: "Pijn" },
      { naam: "Tolperison", sterkte: "50 mg", moment: "Volgens voorschrift", reden: "Spierspanning" },
      { naam: "Paracetamol", sterkte: "500 mg", moment: "Zo nodig", reden: "Pijn" },
      { naam: "Ascorbinezuur", sterkte: "500 mg", moment: "Volgens voorschrift", reden: "Vitamine C" }
    ]
  }
];

const kennis = {
  amlodipine: {
    groep: "Bloeddrukmiddel",
    bijwerkingen: "Duizeligheid, hoofdpijn, blozen, dikke enkels.",
    letop: "Let op lage bloeddruk en vallen, vooral bij ouderen."
  },
  candesartan: {
    groep: "Bloeddruk / hart / nieren",
    bijwerkingen: "Duizeligheid, lage bloeddruk.",
    letop: "Vraag naar controle van nierfunctie en kalium."
  },
  duloxetine: {
    groep: "Zenuwpijn / stemming",
    bijwerkingen: "Misselijkheid, sufheid, duizeligheid, droge mond, onrust.",
    letop: "Niet zomaar stoppen. Let op sufheid en vallen."
  },
  baclofen: {
    groep: "Spierverslapper",
    bijwerkingen: "Sufheid, slappe spieren, duizeligheid, verwardheid.",
    letop: "Bij ouderen extra letten op vallen en sufheid."
  },
  oxycodon: {
    groep: "Sterke pijnstiller",
    bijwerkingen: "Sufheid, obstipatie, misselijkheid, duizeligheid, ademhalingsproblemen.",
    letop: "Sterk middel. Vraag naar afbouwplan en obstipatiepreventie."
  },
  tolperison: {
    groep: "Spierverslapper",
    bijwerkingen: "Duizeligheid, zwakte, misselijkheid.",
    letop: "Let op sufheid en spierzwakte."
  },
  paracetamol: {
    groep: "Pijnstiller",
    bijwerkingen: "Meestal mild bij juiste dosering.",
    letop: "Let op maximale dagdosering."
  },
  ascorbinezuur: {
    groep: "Vitamine C",
    bijwerkingen: "Soms maagklachten of diarree bij hoge dosering.",
    letop: "Meestal geen grote interacties."
  }
};

const combinatieRegels = [
  {
    middelen: ["oxycodon", "baclofen"],
    ernst: "Hoog",
    tekst: "Oxycodon + Baclofen: extra kans op sufheid, duizeligheid, ademhaling en vallen."
  },
  {
    middelen: ["oxycodon", "duloxetine"],
    ernst: "Hoog",
    tekst: "Oxycodon + Duloxetine: extra kans op sufheid, verwardheid en vallen."
  },
  {
    middelen: ["baclofen", "duloxetine"],
    ernst: "Middel",
    tekst: "Baclofen + Duloxetine: let op sufheid, duizeligheid en valrisico."
  },
  {
    middelen: ["amlodipine", "candesartan"],
    ernst: "Middel",
    tekst: "Amlodipine + Candesartan: kan bewust voorgeschreven zijn, maar let op lage bloeddruk en duizeligheid."
  },
  {
    middelen: ["oxycodon"],
    ernst: "Hoog",
    tekst: "Oxycodon: sterke pijnstiller. Let op sufheid, obstipatie, ademhaling en vallen."
  },
  {
    middelen: ["candesartan"],
    ernst: "Middel",
    tekst: "Candesartan: vraag of nierfunctie en kalium worden gecontroleerd."
  }
];

function schoon(tekst) {
  return String(tekst || "").toLowerCase().trim();
}

function vindKennis(naam) {
  const n = schoon(naam);
  return Object.entries(kennis).find(([key]) => n.includes(key))?.[1];
}

function apotheekLink(naam) {
  return `https://www.apotheek.nl/zoeken?q=${encodeURIComponent(naam || "")}`;
}

function checkCombinaties(medicijnen) {
  const namen = medicijnen.map((m) => schoon(m.naam));
  return combinatieRegels.filter((regel) =>
    regel.middelen.every((middel) =>
      namen.some((naam) => naam.includes(middel))
    )
  );
}

function heeftGroep(namen, groep) {
  return namen.filter((naam) =>
    groep.some((middel) => naam.includes(middel))
  );
}

function slimmeRisicoCheck(medicijnen) {
  const namen = medicijnen.map((m) => schoon(m.naam));
  const risico = [];

  const sufmakers = [
    "oxycodon", "morfine", "fentanyl", "tramadol", "codeïne",
    "oxazepam", "lorazepam", "temazepam", "diazepam", "alprazolam",
    "baclofen", "tizanidine", "tolperison",
    "quetiapine", "olanzapine", "risperidon", "haloperidol", "aripiprazol",
    "mirtazapine", "amitriptyline", "nortriptyline",
    "gabapentine", "pregabaline"
  ];

  const bloeddruk = [
    "amlodipine", "candesartan", "losartan", "valsartan", "irbesartan",
    "enalapril", "lisinopril", "perindopril", "ramipril",
    "metoprolol", "bisoprolol", "atenolol", "carvedilol",
    "furosemide", "bumetanide", "hydrochloorthiazide", "spironolacton"
  ];

  const nierKalium = [
    "candesartan", "losartan", "valsartan", "irbesartan",
    "enalapril", "lisinopril", "perindopril", "ramipril",
    "spironolacton", "furosemide", "bumetanide", "hydrochloorthiazide"
  ];

  const opioiden = ["oxycodon", "morfine", "fentanyl", "tramadol", "codeïne", "buprenorfine"];
  const benzos = ["oxazepam", "lorazepam", "temazepam", "diazepam", "alprazolam"];
  const antistolling = ["apixaban", "rivaroxaban", "dabigatran", "edoxaban", "acenocoumarol", "fenprocoumon", "clopidogrel", "acetylsalicylzuur"];
  const nsaids = ["ibuprofen", "naproxen", "diclofenac", "celecoxib"];
  const lithium = ["lithium"];
  const psych = ["aripiprazol", "quetiapine", "olanzapine", "risperidon", "haloperidol", "clozapine", "lithium", "valproïnezuur", "lamotrigine"];

  const suf = heeftGroep(namen, sufmakers);
  if (suf.length >= 2) {
    risico.push({
      ernst: "Hoog",
      titel: "Sufheid en valrisico",
      tekst: "Er zijn meerdere medicijnen gevonden die sufheid, duizeligheid of vallen kunnen versterken.",
      advies: "Bespreek dit met arts of apotheek, vooral bij ouderen of als iemand al gevallen is."
    });
  }

  const opio = heeftGroep(namen, opioiden);
  const benzo = heeftGroep(namen, benzos);
  if (opio.length && benzo.length) {
    risico.push({
      ernst: "Hoog",
      titel: "Sterke pijnstiller + rustgevend middel",
      tekst: "Een opioïde pijnstiller samen met een benzodiazepine kan extra sufheid en ademhalingsrisico geven.",
      advies: "Laat deze combinatie controleren door arts of apotheek."
    });
  }

  const bp = heeftGroep(namen, bloeddruk);
  if (bp.length >= 2) {
    risico.push({
      ernst: "Middel",
      titel: "Bloeddrukmiddelen gestapeld",
      tekst: "Er zijn meerdere middelen gevonden die de bloeddruk kunnen verlagen.",
      advies: "Let op duizeligheid, flauwvallen en vallen. Vraag of bloeddrukcontrole nodig is."
    });
  }

  const nk = heeftGroep(namen, nierKalium);
  if (nk.length >= 2) {
    risico.push({
      ernst: "Middel",
      titel: "Nierfunctie en kalium",
      tekst: "Sommige bloeddruk- en plastabletten kunnen invloed hebben op nierfunctie en kalium.",
      advies: "Vraag arts/apotheek wanneer nierfunctie en kalium voor het laatst gecontroleerd zijn."
    });
  }

  const anti = heeftGroep(namen, antistolling);
  const pijn = heeftGroep(namen, nsaids);
  if (anti.length && pijn.length) {
    risico.push({
      ernst: "Hoog",
      titel: "Bloedverdunner + ontstekingsremmer",
      tekst: "Bloedverdunners samen met NSAID-pijnstillers kunnen de kans op bloedingen verhogen.",
      advies: "Gebruik dit niet zomaar samen. Vraag arts/apotheek om controle."
    });
  }

  const lit = heeftGroep(namen, lithium);
  if (lit.length) {
    risico.push({
      ernst: "Hoog",
      titel: "Lithium vraagt extra controle",
      tekst: "Lithium heeft een smalle veilige marge en vraagt controle van bloedspiegel, nieren en schildklier.",
      advies: "Vraag of controles actueel zijn, vooral bij ziekte, uitdroging of nieuwe medicijnen."
    });
  }

  const psy = heeftGroep(namen, psych);
  if (psy.length >= 2) {
    risico.push({
      ernst: "Middel",
      titel: "Meerdere psychische medicaties",
      tekst: "Er zijn meerdere medicijnen gevonden die stemming, gedrag, sufheid of beweging kunnen beïnvloeden.",
      advies: "Laat beoordelen of alles nog nodig is en let op sufheid, trillen, stijfheid of onrust."
    });
  }

  return risico;
}


export default function App() {
  const [personen, setPersonen] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("medicheck-personen")) || startPersonen;
    } catch {
      return startPersonen;
    }
  });

  const [index, setIndex] = useState(0);
  const persoon = personen[index] || personen[0];

  const [nieuw, setNieuw] = useState({
    naam: "",
    sterkte: "",
    moment: "",
    reden: ""
  });

  function bewaren(nieuwePersonen) {
    setPersonen(nieuwePersonen);
    localStorage.setItem("medicheck-personen", JSON.stringify(nieuwePersonen));
  }

  function persoonToevoegen() {
    const nieuwePersonen = [
      ...personen,
      {
        naam: "",
        leeftijd: "",
        rol: "Mantelzorg",
        contact: "",
        notities: "",
        medicijnen: []
      }
    ];
    bewaren(nieuwePersonen);
    setIndex(nieuwePersonen.length - 1);
  }

  function wijzigPersoon(veld, waarde) {
    const kopie = [...personen];
    kopie[index] = { ...persoon, [veld]: waarde };
    bewaren(kopie);
  }

  function medicijnToevoegen() {
    if (!nieuw.naam.trim()) {
      alert("Vul minimaal de medicijnnaam in.");
      return;
    }

    const kopie = [...personen];
    kopie[index] = {
      ...persoon,
      medicijnen: [...persoon.medicijnen, nieuw]
    };
    bewaren(kopie);
    setNieuw({ naam: "", sterkte: "", moment: "", reden: "" });
  }

  function verwijderMedicijn(i) {
    const kopie = [...personen];
    kopie[index] = {
      ...persoon,
      medicijnen: persoon.medicijnen.filter((_, nr) => nr !== i)
    };
    bewaren(kopie);
  }

  const waarschuwingen = useMemo(() => checkCombinaties(persoon.medicijnen), [persoon]);
  const slimmeRisicos = useMemo(() => slimmeRisicoCheck(persoon.medicijnen), [persoon]);

  const rapport = `
MEDICATIEOVERZICHT - MedicatieMaatje

Persoon:
Naam: ${persoon.naam || "-"}
Leeftijd: ${persoon.leeftijd || "-"}
Rol: ${persoon.rol || "-"}
Contact: ${persoon.contact || "-"}

Notities:
${persoon.notities || "-"}

Medicijnen:
${persoon.medicijnen.map((m) => {
  const info = vindKennis(m.naam);
  return `- ${m.naam || "-"} ${m.sterkte || ""}
  Moment: ${m.moment || "-"}
  Reden: ${m.reden || "-"}
  Groep: ${info?.groep || "Onbekend"}
  Bijwerkingen: ${info?.bijwerkingen || "Bekijk Apotheek.nl of vraag apotheek."}
  Let op: ${info?.letop || "Controleer bij arts/apotheek."}`;
}).join("\n\n")}

Slimme risicocheck:
${slimmeRisicos.length
  ? slimmeRisicos.map((r) => `- [${r.ernst}] ${r.titel}: ${r.tekst} Advies: ${r.advies}`).join("\n")
  : "- Geen extra risicopatronen gevonden."}

Combinatiecheck / aandachtspunten:
${waarschuwingen.length
  ? waarschuwingen.map((w) => `- [${w.ernst}] ${w.tekst}`).join("\n")
  : "- Geen aandachtspunten gevonden in deze eenvoudige checker."}

Vragen voor arts/apotheek:
- Zijn deze medicijnen samen bewust voorgeschreven?
- Is er extra valrisico of sufheid?
- Zijn nierfunctie, kalium of bloeddruk recent gecontroleerd?
- Zijn er medicijnen die afgebouwd kunnen worden?
- Zijn er bijwerkingen die wij moeten melden?

Belangrijk:
Dit is een hulpmiddel, geen officiële medicatiebewaking. Laat medicatie altijd controleren door arts of apotheek.
`;

  async function slimDelen() {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Medicatieoverzicht", text: rapport });
        return;
      } catch {}
    }
    kopieerRapport();
  }

  function deelWhatsApp() {
    window.location.href = "https://wa.me/?text=" + encodeURIComponent(rapport);
  }

  function deelEmail() {
    window.location.href =
      "mailto:?subject=" +
      encodeURIComponent("Medicatieoverzicht") +
      "&body=" +
      encodeURIComponent(rapport);
  }

  async function kopieerRapport() {
    try {
      await navigator.clipboard.writeText(rapport);
      alert("Rapport gekopieerd.");
    } catch {
      const vak = document.getElementById("rapportvak");
      vak.select();
      document.execCommand("copy");
      alert("Rapport geselecteerd. Houd eventueel ingedrukt en kies kopiëren.");
    }
  }

  return (
    <main className="app">
      <section className="hero">
        <h1>💊 MedicatieMaatje</h1>
        <p>Makkelijk medicatie-overzicht voor jezelf, familie en mantelzorg.</p>
        <div className="stats">
          <div><b>{personen.length}</b><span>personen</span></div>
          <div><b>{persoon.medicijnen.length}</b><span>medicijnen</span></div>
          <div><b>{waarschuwingen.length + slimmeRisicos.length}</b><span>aandachtspunten</span></div>
        </div>
      </section>

      <section className="card">
        <div className="toprow">
          <h2>👤 Personen</h2>
          <button onClick={persoonToevoegen}>+ Persoon toevoegen</button>
        </div>

        <div className="tabs">
          {personen.map((p, i) => (
            <button key={i} className={i === index ? "active" : ""} onClick={() => setIndex(i)}>
              {p.naam || "Nieuwe persoon"}
            </button>
          ))}
        </div>

        <div className="grid">
          <input value={persoon.naam} onChange={(e) => wijzigPersoon("naam", e.target.value)} placeholder="Naam" />
          <input value={persoon.leeftijd} onChange={(e) => wijzigPersoon("leeftijd", e.target.value)} placeholder="Leeftijd" />
          <input value={persoon.rol} onChange={(e) => wijzigPersoon("rol", e.target.value)} placeholder="Rol, bijv. moeder / vader / ikzelf" />
          <input value={persoon.contact} onChange={(e) => wijzigPersoon("contact", e.target.value)} placeholder="Contactpersoon / apotheek" />
        </div>

        <textarea value={persoon.notities} onChange={(e) => wijzigPersoon("notities", e.target.value)} rows="4" placeholder="Notities: allergieën, slikproblemen, vallen, bijwerkingen, afspraken..." />
      </section>

      <section className="card">
        <h2>➕ Medicijn toevoegen</h2>
        <div className="grid">
          <div className="medicijnveld">
            <input
              value={nieuw.naam}
              onChange={(e) => setNieuw({ ...nieuw, naam: e.target.value })}
              placeholder="Medicijnnaam, typ bijv. am of para"
            />

            {nieuw.naam.length >= 2 && (
              <div className="suggesties">
                {medicijnSuggesties
                  .filter((m) => m.toLowerCase().includes(nieuw.naam.toLowerCase()))
                  .slice(0, 6)
                  .map((naam) => (
                    <button type="button" key={naam} onClick={() => setNieuw({ ...nieuw, naam })}>
                      {naam}
                    </button>
                  ))}

                {medicijnSuggesties.filter((m) => m.toLowerCase().includes(nieuw.naam.toLowerCase())).length === 0 && (
                  <div className="geenmatch">Geen voorbeeld gevonden. Controleer spelling.</div>
                )}
              </div>
            )}
          </div>
          <input value={nieuw.sterkte} onChange={(e) => setNieuw({ ...nieuw, sterkte: e.target.value })} placeholder="Sterkte, bijv. 5 mg" />
          <input value={nieuw.moment} onChange={(e) => setNieuw({ ...nieuw, moment: e.target.value })} placeholder="Moment, bijv. ochtend" />
          <input value={nieuw.reden} onChange={(e) => setNieuw({ ...nieuw, reden: e.target.value })} placeholder="Waarvoor?" />
        </div>
        <button className="wide" onClick={medicijnToevoegen}>Medicijn opslaan</button>
      </section>

      <section className="card">
        <h2>📋 Medicijnoverzicht</h2>

        {persoon.medicijnen.length === 0 ? (
          <p className="empty">Nog geen medicijnen toegevoegd.</p>
        ) : (
          <div className="medgrid">
            {persoon.medicijnen.map((m, i) => {
              const info = vindKennis(m.naam);
              return (
                <div className="medcard" key={i}>
                  <h3>{m.naam}</h3>
                  <p><b>Sterkte:</b> {m.sterkte || "-"}</p>
                  <p><b>Moment:</b> {m.moment || "-"}</p>
                  <p><b>Reden:</b> {m.reden || "-"}</p>
                  <p><b>Groep:</b> {info?.groep || "Onbekend"}</p>
                  <p><b>Bijwerkingen:</b> {info?.bijwerkingen || "Bekijk Apotheek.nl."}</p>
                  <p><b>Let op:</b> {info?.letop || "Vraag arts/apotheek."}</p>
                  <a href={apotheekLink(m.naam)} target="_blank" rel="noreferrer">Bekijk op Apotheek.nl</a>
                  <button className="delete" onClick={() => verwijderMedicijn(i)}>Verwijder</button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="card">
        <h2>⚠️ Combinatiecheck</h2>
        {waarschuwingen.length === 0 ? (
          <p className="ok">Geen aandachtspunten gevonden in deze eenvoudige checker.</p>
        ) : (
          waarschuwingen.map((w, i) => (
            <div className={`alert ${w.ernst.toLowerCase()}`} key={i}>
              <b>{w.ernst}</b>
              <p>{w.tekst}</p>
            </div>
          ))
        )}
      </section>

      <section className="card">
        <h2>📄 Rapportage delen</h2>
        <textarea id="rapportvak" readOnly value={rapport} rows="16" />

        <div className="sharebox">
          <button className="wide share" onClick={slimDelen}>📲 Slim delen via telefoon</button>
          <button className="wide whatsapp" onClick={deelWhatsApp}>💬 Deel via WhatsApp</button>
          <button className="wide email" onClick={deelEmail}>✉️ Verstuur via e-mail</button>
          <button className="wide copy" onClick={kopieerRapport}>📋 Kopieer rapport</button>
        </div>
      </section>

      <section className="card warning">
        <b>Belangrijk:</b> deze app helpt met overzicht en aandachtspunten, maar vervangt geen arts of apotheek.
      </section>
    </main>
  );
}

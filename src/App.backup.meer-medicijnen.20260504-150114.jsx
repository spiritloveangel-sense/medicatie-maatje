import { useMemo, useState } from "react";
import "./App.css";

const medicijnSuggesties = [
  "Amlodipine", "Candesartan", "Duloxetine", "Baclofen", "Oxycodon",
  "Tolperison", "Paracetamol", "Ascorbinezuur", "Omeprazol", "Pantoprazol",
  "Metoprolol", "Furosemide", "Atorvastatine", "Simvastatine", "Metformine",
  "Tramadol", "Ibuprofen", "Naproxen", "Diclofenac", "Oxazepam",
  "Temazepam", "Lorazepam", "Mirtazapine", "Sertraline", "Escitalopram"
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
          <div><b>{waarschuwingen.length}</b><span>aandachtspunten</span></div>
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

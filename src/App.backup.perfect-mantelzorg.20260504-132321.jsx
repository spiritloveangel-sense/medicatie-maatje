import { useMemo, useState } from "react";
import "./App.css";

const voorbeeldPersonen = [
  {
    naam: "Moeder",
    leeftijd: "86",
    rol: "Voorbeeld mantelzorg",
    notities:
      "Voorbeeld: let op sufheid, duizeligheid, vallen, slikproblemen en vragen voor arts/apotheek.",
    medicijnen: [
      { naam: "Amlodipine", sterkte: "5 mg", moment: "Ochtend", reden: "Bloeddruk" },
      { naam: "Candesartan", sterkte: "4 mg", moment: "Ochtend", reden: "Bloeddruk / nieren" },
      { naam: "Duloxetine", sterkte: "60 mg", moment: "Ochtend", reden: "Zenuwpijn / stemming" },
      { naam: "Baclofen", sterkte: "2,5 mg", moment: "Volgens voorschrift", reden: "Spierspanning" },
      { naam: "Oxycodon", sterkte: "2 mg", moment: "Volgens voorschrift", reden: "Pijn" },
      { naam: "Tolperison", sterkte: "50 mg", moment: "Volgens voorschrift", reden: "Spierspanning" },
      { naam: "Paracetamol", sterkte: "500 mg", moment: "Zo nodig / volgens voorschrift", reden: "Pijn" },
      { naam: "Ascorbinezuur", sterkte: "500 mg", moment: "Volgens voorschrift", reden: "Vitamine C" }
    ]
  }
];

const regels = [
  {
    middelen: ["Oxycodon", "Baclofen"],
    ernst: "Hoog",
    tekst: "Oxycodon + Baclofen: extra kans op sufheid, duizeligheid, ademhalingsproblemen en vallen."
  },
  {
    middelen: ["Oxycodon", "Duloxetine"],
    ernst: "Hoog",
    tekst: "Oxycodon + Duloxetine: extra kans op sufheid, verwardheid en vallen."
  },
  {
    middelen: ["Baclofen", "Duloxetine"],
    ernst: "Middel",
    tekst: "Baclofen + Duloxetine: let op sufheid, duizeligheid en valrisico."
  },
  {
    middelen: ["Amlodipine", "Candesartan"],
    ernst: "Middel",
    tekst: "Amlodipine + Candesartan: kan bewust zijn, maar let op lage bloeddruk en duizeligheid."
  },
  {
    middelen: ["Candesartan"],
    ernst: "Middel",
    tekst: "Candesartan: vraag of nierfunctie en kalium gecontroleerd worden."
  },
  {
    middelen: ["Oxycodon"],
    ernst: "Hoog",
    tekst: "Oxycodon: sterke pijnstiller. Let op sufheid, obstipatie, ademhaling en vallen."
  }
];

function apotheekLink(naam) {
  return `https://www.apotheek.nl/zoeken?q=${encodeURIComponent(naam || "")}`;
}

function checkMedicatie(medicijnen) {
  const namen = medicijnen.map((m) => m.naam.toLowerCase());
  return regels.filter((r) =>
    r.middelen.every((middel) =>
      namen.some((n) => n.includes(middel.toLowerCase()))
    )
  );
}

export default function App() {
  const [personen, setPersonen] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("medicheck-personen")) || voorbeeldPersonen;
    } catch {
      return voorbeeldPersonen;
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
        naam: "Nieuwe persoon",
        leeftijd: "",
        rol: "Mantelzorg",
        notities: "",
        medicijnen: []
      }
    ];
    bewaren(nieuwePersonen);
    setIndex(nieuwePersonen.length - 1);
  }

  function persoonWijzigen(veld, waarde) {
    const kopie = [...personen];
    kopie[index] = { ...persoon, [veld]: waarde };
    bewaren(kopie);
  }

  function medicijnToevoegen() {
    if (!nieuw.naam.trim()) return alert("Vul minimaal de medicijnnaam in.");

    const kopie = [...personen];
    kopie[index] = {
      ...persoon,
      medicijnen: [...persoon.medicijnen, nieuw]
    };
    bewaren(kopie);
    setNieuw({ naam: "", sterkte: "", moment: "", reden: "" });
  }

  function medicijnVerwijderen(i) {
    const kopie = [...personen];
    kopie[index] = {
      ...persoon,
      medicijnen: persoon.medicijnen.filter((_, nr) => nr !== i)
    };
    bewaren(kopie);
  }

  const waarschuwingen = useMemo(
    () => checkMedicatie(persoon.medicijnen),
    [persoon]
  );

  const rapport = `
MEDICATIEOVERZICHT

Naam: ${persoon.naam}
Leeftijd: ${persoon.leeftijd}
Rol: ${persoon.rol}

Notities:
${persoon.notities || "-"}

Medicijnen:
${persoon.medicijnen
  .map(
    (m) =>
      `- ${m.naam} ${m.sterkte || ""} | ${m.moment || "moment onbekend"} | ${m.reden || "reden onbekend"}`
  )
  .join("\n")}

Aandachtspunten:
${
  waarschuwingen.length
    ? waarschuwingen.map((w) => `- [${w.ernst}] ${w.tekst}`).join("\n")
    : "- Geen aandachtspunten gevonden in deze eenvoudige checker."
}

Belangrijk:
Dit is een hulpmiddel. Laat medicatie altijd controleren door arts of apotheek.
`;

  return (
    <main className="app">
      <section className="hero">
        <h1>💊 MediCheck Familie</h1>
        <p>Overzicht voor mantelzorg: personen, medicatie, aandachtspunten en rapportage.</p>
      </section>

      <section className="card">
        <div className="toprow">
          <h2>👤 Personen</h2>
          <button onClick={persoonToevoegen}>+ Persoon toevoegen</button>
        </div>

        <div className="tabs">
          {personen.map((p, i) => (
            <button
              key={i}
              className={i === index ? "active" : ""}
              onClick={() => setIndex(i)}
            >
              {p.naam || "Naamloos"}
            </button>
          ))}
        </div>

        <div className="grid">
          <input
            value={persoon.naam}
            onChange={(e) => persoonWijzigen("naam", e.target.value)}
            placeholder="Naam"
          />
          <input
            value={persoon.leeftijd}
            onChange={(e) => persoonWijzigen("leeftijd", e.target.value)}
            placeholder="Leeftijd"
          />
          <input
            value={persoon.rol}
            onChange={(e) => persoonWijzigen("rol", e.target.value)}
            placeholder="Rol / relatie"
          />
        </div>

        <textarea
          value={persoon.notities}
          onChange={(e) => persoonWijzigen("notities", e.target.value)}
          placeholder="Mantelzorgnotities: allergieën, slikproblemen, vallen, afspraken, contactpersoon..."
          rows="4"
        />
      </section>

      <section className="card">
        <h2>➕ Medicijn toevoegen</h2>

        <div className="grid">
          <input
            value={nieuw.naam}
            onChange={(e) => setNieuw({ ...nieuw, naam: e.target.value })}
            placeholder="Medicijnnaam"
          />
          <input
            value={nieuw.sterkte}
            onChange={(e) => setNieuw({ ...nieuw, sterkte: e.target.value })}
            placeholder="Sterkte, bijv. 5 mg"
          />
          <input
            value={nieuw.moment}
            onChange={(e) => setNieuw({ ...nieuw, moment: e.target.value })}
            placeholder="Moment, bijv. ochtend"
          />
          <input
            value={nieuw.reden}
            onChange={(e) => setNieuw({ ...nieuw, reden: e.target.value })}
            placeholder="Waarvoor?"
          />
        </div>

        <button className="wide" onClick={medicijnToevoegen}>
          Medicijn opslaan bij {persoon.naam}
        </button>
      </section>

      <section className="card">
        <h2>📋 Medicijnoverzicht van {persoon.naam}</h2>

        {persoon.medicijnen.length === 0 ? (
          <p className="empty">Nog geen medicijnen toegevoegd.</p>
        ) : (
          <div className="medgrid">
            {persoon.medicijnen.map((m, i) => (
              <div className="medcard" key={i}>
                <h3>{m.naam}</h3>
                <p><b>Sterkte:</b> {m.sterkte || "-"}</p>
                <p><b>Moment:</b> {m.moment || "-"}</p>
                <p><b>Reden:</b> {m.reden || "-"}</p>
                <a href={apotheekLink(m.naam)} target="_blank" rel="noreferrer">
                  Bekijk op Apotheek.nl
                </a>
                <button className="delete" onClick={() => medicijnVerwijderen(i)}>
                  Verwijder
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="card">
        <h2>⚠️ Aandachtspunten</h2>

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
        <h2>📄 Rapport voor arts / apotheek / WhatsApp</h2>
        <textarea readOnly value={rapport} rows="14" />
        <button
          className="wide"
          onClick={() => {
            navigator.clipboard.writeText(rapport);
            alert("Rapport gekopieerd");
          }}
        >
          Kopieer rapport
        </button>
      </section>

      <section className="card warning">
        <b>Belangrijk:</b> deze app is een hulpmiddel, geen officiële medicatiebewaking.
        Laat combinaties altijd controleren door arts of apotheek.
      </section>
    </main>
  );
}

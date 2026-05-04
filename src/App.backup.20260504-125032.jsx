import { useMemo, useState } from "react";
import "./App.css";

const personenStart = [
  {
    naam: "Mama86",
    leeftijd: 86,
    medicijnen: [
      "Amlodipine",
      "Candesartan",
      "Duloxetine",
      "Baclofen",
      "Oxycodon",
      "Tolperison",
      "Paracetamol",
      "Ascorbinezuur"
    ]
  }
];

const interactieRegels = [
  {
    middelen: ["Oxycodon", "Baclofen"],
    ernst: "Hoog",
    titel: "Extra sufheid / ademhaling / valrisico",
    uitleg:
      "Deze combinatie kan extra sufheid, duizeligheid, verwardheid en valrisico geven. Bij ouderen extra opletten.",
    vraag:
      "Vraag arts/apotheek of deze combinatie bewust zo bedoeld is en waarop gelet moet worden."
  },
  {
    middelen: ["Oxycodon", "Duloxetine"],
    ernst: "Hoog",
    titel: "Sufheid en verwardheid",
    uitleg:
      "Samen kunnen deze middelen sufheid, duizeligheid en verwardheid versterken.",
    vraag:
      "Vraag of dosering en noodzaak regelmatig gecontroleerd worden."
  },
  {
    middelen: ["Baclofen", "Duloxetine"],
    ernst: "Middel",
    titel: "Meer kans op sufheid en vallen",
    uitleg:
      "Beide kunnen invloed hebben op alertheid. Bij ouderen kan dit valrisico verhogen.",
    vraag:
      "Vraag of er signalen zijn van slaperigheid, vallen of verwardheid."
  },
  {
    middelen: ["Amlodipine", "Candesartan"],
    ernst: "Middel",
    titel: "Bloeddruk kan extra dalen",
    uitleg:
      "Deze combinatie wordt vaak bewust gebruikt, maar kan duizeligheid of lage bloeddruk geven.",
    vraag:
      "Vraag of bloeddruk, duizeligheid en vallen worden gecontroleerd."
  },
  {
    middelen: ["Candesartan"],
    ernst: "Middel",
    titel: "Controle nierfunctie en kalium",
    uitleg:
      "Bij candesartan kan controle van nierfunctie en kalium belangrijk zijn, vooral bij kwetsbare ouderen.",
    vraag:
      "Vraag wanneer nierfunctie en kalium voor het laatst gecontroleerd zijn."
  },
  {
    middelen: ["Duloxetine"],
    ernst: "Middel",
    titel: "Let op stemming, sufheid en stoppen",
    uitleg:
      "Duloxetine kan bijwerkingen geven zoals misselijkheid, sufheid, duizeligheid of onrust. Niet zomaar stoppen.",
    vraag:
      "Vraag of het middel nog nodig is en hoe stoppen eventueel veilig moet."
  },
  {
    middelen: ["Oxycodon"],
    ernst: "Hoog",
    titel: "Sterke pijnstiller",
    uitleg:
      "Oxycodon is een sterke opioïde pijnstiller. Let op sufheid, obstipatie, ademhaling en vallen.",
    vraag:
      "Vraag of er een afbouwplan is en of obstipatiepreventie nodig is."
  },
  {
    middelen: ["Paracetamol"],
    ernst: "Laag",
    titel: "Let op maximale dagdosering",
    uitleg:
      "Paracetamol is vaak veilig, maar te veel kan schadelijk zijn voor de lever.",
    vraag:
      "Controleer hoeveel mg per dag totaal wordt gebruikt."
  }
];

function norm(x) {
  return String(x || "").toLowerCase().trim();
}

function apotheekLink(naam) {
  return `https://www.apotheek.nl/zoeken?q=${encodeURIComponent(naam || "")}`;
}

function checkMedicatie(medicijnen) {
  const lijst = medicijnen.map(norm).filter(Boolean);

  return interactieRegels.filter((regel) =>
    regel.middelen.every((middel) =>
      lijst.some((m) => m.includes(norm(middel)) || norm(middel).includes(m))
    )
  );
}

export default function App() {
  const [personen, setPersonen] = useState(personenStart);
  const [persoonIndex, setPersoonIndex] = useState(0);
  const [nieuwMedicijn, setNieuwMedicijn] = useState("");

  const persoon = personen[persoonIndex];

  const waarschuwingen = useMemo(
    () => checkMedicatie(persoon.medicijnen),
    [persoon]
  );

  function voegMedicijnToe() {
    if (!nieuwMedicijn.trim()) return;

    const kopie = [...personen];
    kopie[persoonIndex] = {
      ...persoon,
      medicijnen: [...persoon.medicijnen, nieuwMedicijn.trim()]
    };

    setPersonen(kopie);
    setNieuwMedicijn("");
  }

  function verwijderMedicijn(med) {
    const kopie = [...personen];
    kopie[persoonIndex] = {
      ...persoon,
      medicijnen: persoon.medicijnen.filter((m) => m !== med)
    };
    setPersonen(kopie);
  }

  const rapport = `
MEDICATIE-RAPPORT

Persoon: ${persoon.naam}
Leeftijd: ${persoon.leeftijd}

Medicijnen:
${persoon.medicijnen.map((m) => "- " + m).join("\n")}

Aandachtspunten:
${
  waarschuwingen.length
    ? waarschuwingen
        .map(
          (w) =>
            `- [${w.ernst}] ${w.titel}\n  ${w.uitleg}\n  Vraag: ${w.vraag}`
        )
        .join("\n\n")
    : "- Geen aandachtspunten gevonden in deze eenvoudige checker."
}

Belangrijk:
Dit is geen officiële medicatiebewaking. Laat dit altijd controleren door arts of apotheek.
`;

  function kopieerRapport() {
    navigator.clipboard.writeText(rapport);
    alert("Rapport gekopieerd");
  }

  return (
    <main className="app">
      <section className="card hero">
        <h1>💊 MediCheck Familie</h1>
        <p>
          Hulpmiddel voor medicatie-overzicht, aandachtspunten en vragen voor
          arts of apotheek.
        </p>
      </section>

      <section className="card">
        <h2>Persoon</h2>
        <select
          value={persoonIndex}
          onChange={(e) => setPersoonIndex(Number(e.target.value))}
        >
          {personen.map((p, i) => (
            <option key={p.naam} value={i}>
              {p.naam} — {p.leeftijd} jaar
            </option>
          ))}
        </select>
      </section>

      <section className="card">
        <h2>Medicijnen</h2>

        <div className="inputrow">
          <input
            value={nieuwMedicijn}
            onChange={(e) => setNieuwMedicijn(e.target.value)}
            placeholder="Bijv. Amlodipine"
          />
          <button onClick={voegMedicijnToe}>Toevoegen</button>
        </div>

        <div className="medlist">
          {persoon.medicijnen.map((med) => (
            <div className="med" key={med}>
              <div>
                <strong>{med}</strong>
                <br />
                <a href={apotheekLink(med)} target="_blank" rel="noreferrer">
                  Bekijk op Apotheek.nl
                </a>
              </div>
              <button onClick={() => verwijderMedicijn(med)}>Verwijder</button>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>⚠️ Medicatiechecker</h2>

        {waarschuwingen.length === 0 ? (
          <p className="ok">
            Geen bekende aandachtspunten gevonden in deze eenvoudige checker.
          </p>
        ) : (
          <div className="alerts">
            {waarschuwingen.map((w, i) => (
              <div className={`alert ${w.ernst.toLowerCase()}`} key={i}>
                <strong>
                  {w.ernst} — {w.titel}
                </strong>
                <p>{w.uitleg}</p>
                <p>
                  <b>Vraag:</b> {w.vraag}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="card">
        <h2>📄 Rapportage</h2>
        <textarea value={rapport} readOnly rows="14" />
        <button onClick={kopieerRapport}>Kopieer rapport voor WhatsApp / arts</button>
      </section>

      <section className="card warning">
        <h2>Belangrijk</h2>
        <p>
          Deze app is een hulpmiddel en geen officiële medicatiebewaking.
          Apotheek.nl adviseert bij vragen contact op te nemen met de eigen
          apotheek; de apotheker kan helpen met vragen over medicijnen,
          bijwerkingen en juist gebruik.
        </p>
      </section>
    </main>
  );
}

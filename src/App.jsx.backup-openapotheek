import { useEffect, useState } from "react";
import "./App.css";

const dagdelen = ["Ochtend", "Middag", "Avond", "Nacht", "Zo nodig"];

const encyclopedie = {
  amlodipine: ["Bloeddruk", "Verlaagt de bloeddruk.", "Kan duizeligheid, lage bloeddruk of dikke enkels geven."],
  candesartan: ["Bloeddruk / nieren", "Bloeddrukmiddel.", "Nierfunctie en kalium kunnen controle nodig hebben."],
  clopidogrel: ["Bloedverdunner", "Helpt bloedstolsels voorkomen.", "Let op blauwe plekken, bloedneuzen of bloedingen."],
  duloxetine: ["Zenuwpijn / stemming", "Bij zenuwpijn, depressie of angst.", "Kan duizeligheid, sufheid en vallen geven."],
  baclofen: ["Spierontspanner", "Bij spierkrampen of spierspanning.", "Kan sufheid, spierzwakte en valrisico geven."],
  tolperison: ["Spierontspanner", "Bij spierspanning.", "Let op duizeligheid, zwakte en dubbeling met andere spiermiddelen."],
  paracetamol: ["Pijnstiller", "Tegen pijn en koorts.", "Let op maximale dagdosering."],
  oxycodon: ["Sterke pijnstiller", "Bij ernstige pijn.", "Let op sufheid, ademhaling, verstopping en vallen."],
  clonazepam: ["Rust / slaap", "Kalmerend middel, ook bekend als Rivotril.", "Kan sufheid, verwardheid en valrisico geven."],
  rivotril: ["Rust / slaap", "Merknaam van clonazepam.", "Kan sufheid, verwardheid en valrisico geven."],
  macrogol: ["Laxeermiddel", "Tegen verstopping.", "Vaak belangrijk bij oxycodon."],
  movicol: ["Laxeermiddel", "Tegen verstopping.", "Vaak belangrijk bij oxycodon."],
  gloup: ["Slikhulpmiddel", "Helpt medicijnen makkelijker doorslikken.", "Bij slikproblemen overleggen met arts, apotheker of logopedie."],
  fluoxetine: ["Antidepressivum", "Bij depressie, angst of dwangklachten.", "Kan misselijkheid, slapeloosheid en interacties geven."],
  aripiprazol: ["Antipsychoticum", "Bij psychische klachten, onrust, manie of psychose.", "Kan rusteloosheid, sufheid of duizeligheid geven."]
};

const mamaMedicatie = [
  { naam: "Amlodipine", sterkte: "5 mg", hoeveelheid: "1 tablet", dagdeel: "Ochtend", reden: "Voor de bloeddruk", instructie: "Mag gemalen worden." },
  { naam: "Candesartan", sterkte: "4 mg", hoeveelheid: "1 tablet", dagdeel: "Ochtend", reden: "Voor bloeddruk / nieren", instructie: "Nierfunctie en kalium kunnen controle nodig hebben." },
  { naam: "Duloxetine", sterkte: "60 mg", hoeveelheid: "1 capsule", dagdeel: "Ochtend", reden: "Voor zenuwpijn / stemming", instructie: "Kan sufheid of duizeligheid geven." },
  { naam: "Baclofen", sterkte: "2,5 mg", hoeveelheid: "2 tabletten", dagdeel: "Ochtend", reden: "Voor spierontspanning", instructie: "Tijdens eten innemen." },
  { naam: "Tolperison", sterkte: "50 mg", hoeveelheid: "3 tabletten", dagdeel: "Ochtend", reden: "Voor spierontspanning", instructie: "Tijdens of vlak na eten." },
  { naam: "Paracetamol", sterkte: "500 mg", hoeveelheid: "2 tabletten", dagdeel: "Ochtend", reden: "Tegen pijn", instructie: "Let op maximale dagdosering." },
  { naam: "Gloup slikgel", sterkte: "", hoeveelheid: "5 ml", dagdeel: "Ochtend", reden: "Helpt met slikken", instructie: "Bij medicatie-inname." },
  { naam: "Macrogol / Movicol", sterkte: "", hoeveelheid: "1 sachet", dagdeel: "Ochtend", reden: "Tegen verstopping", instructie: "Eerst oplossen in water." },

  { naam: "Clopidogrel", sterkte: "75 mg", hoeveelheid: "1 tablet", dagdeel: "Middag", reden: "Bloedverdunner", instructie: "Let op bloedingen of blauwe plekken." },
  { naam: "Tolperison", sterkte: "50 mg", hoeveelheid: "3 tabletten", dagdeel: "Middag", reden: "Voor spierontspanning", instructie: "Tijdens of vlak na eten." },
  { naam: "Paracetamol", sterkte: "500 mg", hoeveelheid: "2 tabletten", dagdeel: "Middag", reden: "Tegen pijn", instructie: "Let op maximale dagdosering." },
  { naam: "Gloup slikgel", sterkte: "", hoeveelheid: "5 ml", dagdeel: "Middag", reden: "Helpt met slikken", instructie: "Bij medicatie-inname." },

  { naam: "Baclofen", sterkte: "2,5 mg", hoeveelheid: "2 tabletten", dagdeel: "Avond", reden: "Voor spierontspanning", instructie: "Tijdens eten innemen." },
  { naam: "Tolperison", sterkte: "50 mg", hoeveelheid: "3 tabletten", dagdeel: "Avond", reden: "Voor spierontspanning", instructie: "Tijdens of vlak na eten." },
  { naam: "Paracetamol", sterkte: "500 mg", hoeveelheid: "2 tabletten", dagdeel: "Avond", reden: "Tegen pijn", instructie: "Let op maximale dagdosering." },
  { naam: "Gloup slikgel", sterkte: "", hoeveelheid: "5 ml", dagdeel: "Avond", reden: "Helpt met slikken", instructie: "Bij medicatie-inname." },
  { naam: "Macrogol / Movicol", sterkte: "", hoeveelheid: "1 sachet", dagdeel: "Avond", reden: "Tegen verstopping", instructie: "Eerst oplossen in water." },

  { naam: "Baclofen", sterkte: "2,5 mg", hoeveelheid: "2 tabletten", dagdeel: "Nacht", reden: "Voor spierontspanning", instructie: "Tijdens eten innemen." },
  { naam: "Paracetamol", sterkte: "500 mg", hoeveelheid: "2 tabletten", dagdeel: "Nacht", reden: "Tegen pijn", instructie: "Let op maximale dagdosering." },
  { naam: "Clonazepam / Rivotril", sterkte: "0,5 mg", hoeveelheid: "2 tabletten", dagdeel: "Nacht", reden: "Voor rust / slaap / spanning", instructie: "Kan sufheid, verwardheid en valrisico geven." },
  { naam: "Gloup slikgel", sterkte: "", hoeveelheid: "5 ml", dagdeel: "Nacht", reden: "Helpt met slikken", instructie: "Bij medicatie-inname." },

  { naam: "Oxycodon", sterkte: "5 mg", hoeveelheid: "Zo nodig", dagdeel: "Zo nodig", reden: "Sterke pijnstiller", instructie: "Let op sufheid, ademhaling, verstopping en vallen." }
];

const startPersonen = [
  { naam: "Mama", leeftijd: "86", opmerking: "Anoniem voorbeeld. Slikproblemen gemeld.", meds: mamaMedicatie }
];

function zoekInfo(naam) {
  const tekst = String(naam || "").toLowerCase();
  const sleutel = Object.keys(encyclopedie).find(k => tekst.includes(k));
  if (!sleutel) return null;
  const [groep, waarvoor, letop] = encyclopedie[sleutel];
  return { groep, waarvoor, letop };
}

function analyseer(meds) {
  const tekst = meds.map(m => m.naam.toLowerCase()).join(" ");
  const lijst = [];

  if (meds.length >= 10) lijst.push("Veel medicatie: vraag arts of apotheker om een medicatiebeoordeling.");
  if (tekst.includes("oxycodon")) lijst.push("Oxycodon: let op sufheid, ademhaling, verstopping en vallen.");
  if (tekst.includes("clonazepam") || tekst.includes("rivotril")) lijst.push("Clonazepam/Rivotril: verhoogd risico op sufheid, verwardheid en vallen.");
  if (tekst.includes("baclofen") && tekst.includes("tolperison")) lijst.push("Baclofen + Tolperison: meerdere spierontspanners, extra letten op zwakte en vallen.");
  if (tekst.includes("clopidogrel")) lijst.push("Clopidogrel: let op blauwe plekken, bloedneuzen of bloedingen.");
  if (tekst.includes("gloup")) lijst.push("Slikgel aanwezig: slikproblemen bespreken met arts, apotheker of logopedie.");
  if (tekst.includes("oxycodon") && !(tekst.includes("macrogol") || tekst.includes("movicol"))) lijst.push("Sterke pijnstiller zonder duidelijk laxeermiddel: vraag of verstopping voldoende wordt voorkomen.");

  return lijst;
}

function vragenVoorArts(meds) {
  const tekst = meds.map(m => m.naam.toLowerCase()).join(" ");
  const vragen = [
    "Zijn alle medicijnen nog nodig?",
    "Kan het schema eenvoudiger of veiliger?",
    "Zijn er medicijnen die sufheid, duizeligheid of vallen kunnen veroorzaken?",
    "Zijn er combinaties die extra aandacht vragen?"
  ];

  if (tekst.includes("oxycodon")) vragen.push("Is oxycodon nog nodig en is er voldoende aandacht voor verstopping en sufheid?");
  if (tekst.includes("clonazepam") || tekst.includes("rivotril")) vragen.push("Is langdurig gebruik van clonazepam/Rivotril nog nodig?");
  if (tekst.includes("baclofen") && tekst.includes("tolperison")) vragen.push("Is de combinatie Baclofen + Tolperison bewust gekozen?");
  if (tekst.includes("candesartan")) vragen.push("Moeten nierfunctie en kalium gecontroleerd worden?");
  if (tekst.includes("clopidogrel")) vragen.push("Waar moeten we op letten bij bloedingen of blauwe plekken?");
  if (tekst.includes("gloup")) vragen.push("Moet het slikprobleem verder beoordeeld worden?");

  return vragen;
}

export default function App() {
  const [personen, setPersonen] = useState(() => {
    try { return JSON.parse(localStorage.getItem("mc_personen")) || startPersonen; }
    catch { return startPersonen; }
  });

  const [actief, setActief] = useState(() => Number(localStorage.getItem("mc_actief") || 0));
  const [tab, setTab] = useState("overzicht");
  const [open, setOpen] = useState({});
  const [check, setCheck] = useState(() => {
    try { return JSON.parse(localStorage.getItem("mc_check")) || {}; }
    catch { return {}; }
  });

  const [formPersoon, setFormPersoon] = useState({ naam: "", leeftijd: "", opmerking: "" });
  const [formMed, setFormMed] = useState({ naam: "", sterkte: "", hoeveelheid: "", dagdeel: "Ochtend", reden: "", instructie: "" });
  const [editMedIndex, setEditMedIndex] = useState(null);
  const [editPersoon, setEditPersoon] = useState(false);
  const [zoek, setZoek] = useState("");
  const [zoekUitleg, setZoekUitleg] = useState("");

  useEffect(() => {
    localStorage.setItem("mc_personen", JSON.stringify(personen));
    localStorage.setItem("mc_actief", String(actief));
    localStorage.setItem("mc_check", JSON.stringify(check));
  }, [personen, actief, check]);

  const persoon = personen[actief] || startPersonen[0];
  const meds = persoon.meds || [];
  const waarschuwingen = analyseer(meds);
  const vragen = vragenVoorArts(meds);

  function updatePersoon(nieuwePersoon) {
    const nieuw = [...personen];
    nieuw[actief] = nieuwePersoon;
    setPersonen(nieuw);
  }

  function laadMama() {
    const zonderMama = personen.filter(p => !(p.naam === "Mama" && p.leeftijd === "86"));
    setPersonen([{ naam: "Mama", leeftijd: "86", opmerking: "Anoniem voorbeeld. Slikproblemen gemeld.", meds: mamaMedicatie }, ...zonderMama]);
    setActief(0);
    setTab("overzicht");
  }

  function voegPersoonToe() {
    if (!formPersoon.naam.trim()) return alert("Vul een naam in.");
    setPersonen([...personen, { ...formPersoon, meds: [] }]);
    setActief(personen.length);
    setFormPersoon({ naam: "", leeftijd: "", opmerking: "" });
  }

  function startBewerkPersoon() {
    setFormPersoon({ naam: persoon.naam || "", leeftijd: persoon.leeftijd || "", opmerking: persoon.opmerking || "" });
    setEditPersoon(true);
  }

  function bewaarPersoon() {
    updatePersoon({ ...persoon, ...formPersoon });
    setEditPersoon(false);
    setFormPersoon({ naam: "", leeftijd: "", opmerking: "" });
  }

  function voegOfBewerkMedicijn(e) {
    e.preventDefault();
    if (!formMed.naam.trim()) return alert("Vul een medicijnnaam in.");
    const info = zoekInfo(formMed.naam);
    const med = { ...formMed, reden: formMed.reden || info?.waarvoor || "" };
    const nieuweMeds = [...meds];

    if (editMedIndex === null) nieuweMeds.push(med);
    else nieuweMeds[editMedIndex] = med;

    updatePersoon({ ...persoon, meds: nieuweMeds });
    setFormMed({ naam: "", sterkte: "", hoeveelheid: "", dagdeel: "Ochtend", reden: "", instructie: "" });
    setEditMedIndex(null);
    setTab("overzicht");
  }

  function startBewerkMedicijn(i) {
    setFormMed(meds[i]);
    setEditMedIndex(i);
    setTab("toevoegen");
  }

  function verwijderMedicijn(i) {
    if (!confirm("Medicijn verwijderen?")) return;
    updatePersoon({ ...persoon, meds: meds.filter((_, idx) => idx !== i) });
  }

  function maakRapport() {
    return `MEDICATIE-RAPPORT

Persoon: ${persoon.naam || "-"}
Leeftijd: ${persoon.leeftijd || "-"}
Opmerking: ${persoon.opmerking || "-"}

MEDICATIE:
${meds.map(m => `- ${m.dagdeel}: ${m.naam} | ${m.sterkte || "-"} | ${m.hoeveelheid || "-"} | ${m.reden || "-"} | ${m.instructie || "-"}`).join("\n") || "- Geen medicatie ingevuld."}

AANDACHTSPUNTEN:
${waarschuwingen.map(w => "- " + w).join("\n") || "- Geen automatische aandachtspunten."}

VRAGEN VOOR ARTS/APOTHEEK:
${vragen.map(v => "- " + v).join("\n")}

Let op: dit is een hulpmiddel. Controleer altijd met arts of apotheker.`;
  }

  function kopieerRapport() {
    navigator.clipboard.writeText(maakRapport());
    alert("Rapport gekopieerd.");
  }

  function stuurWhatsApp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(maakRapport())}`, "_blank");
  }

  function stuurEmail() {
    const onderwerp = encodeURIComponent("Medicatie-rapport " + (persoon.naam || ""));
    const body = encodeURIComponent(maakRapport());
    window.location.href = `mailto:?subject=${onderwerp}&body=${body}`;
  }

  function openApotheek(naam) {
    window.open("https://www.apotheek.nl/zoeken?q=" + encodeURIComponent(naam), "_blank");
  }

  const gefilterd = meds.filter(m => (m.naam + " " + m.reden + " " + m.instructie + " " + m.dagdeel).toLowerCase().includes(zoek.toLowerCase()));
  const uitlegResultaten = Object.entries(encyclopedie).filter(([naam, data]) => (naam + " " + data.join(" ")).toLowerCase().includes(zoekUitleg.toLowerCase()));
  const totaalNog = meds.filter((m, i) => !check[persoon.naam + m.dagdeel + i]).length;

  return (
    <main className="app">
      <section className="hero">
        <p className="tag">MediCheck Mantelzorg</p>
        <h1>Medicatie duidelijk bijhouden</h1>
        <p>Voor mantelzorg, familie en eigen overzicht. Met rapportage voor arts of apotheek.</p>
        <button onClick={laadMama}>Laad voorbeeld Mama 86</button>
      </section>

      <section className="notice">
        <b>Belangrijk:</b> dit is een hulpmiddel en geen medisch advies. Controleer medicatie altijd met arts of apotheker.
      </section>

      <section className="card">
        <h2>Personen</h2>
        {personen.map((p, i) => (
          <button key={i} className={i === actief ? "active" : ""} onClick={() => setActief(i)}>
            {p.naam} {p.leeftijd ? `(${p.leeftijd})` : ""}
          </button>
        ))}

        <button onClick={startBewerkPersoon}>Bewerk actieve persoon</button>

        {editPersoon && (
          <div className="editBox">
            <input placeholder="Naam" value={formPersoon.naam} onChange={e => setFormPersoon({ ...formPersoon, naam: e.target.value })} />
            <input placeholder="Leeftijd" value={formPersoon.leeftijd} onChange={e => setFormPersoon({ ...formPersoon, leeftijd: e.target.value })} />
            <input placeholder="Opmerking" value={formPersoon.opmerking} onChange={e => setFormPersoon({ ...formPersoon, opmerking: e.target.value })} />
            <button onClick={bewaarPersoon}>Bewaar persoon</button>
          </div>
        )}

        <h3>Nieuwe persoon toevoegen</h3>
        <input placeholder="Naam" value={formPersoon.naam} onChange={e => setFormPersoon({ ...formPersoon, naam: e.target.value })} />
        <input placeholder="Leeftijd" value={formPersoon.leeftijd} onChange={e => setFormPersoon({ ...formPersoon, leeftijd: e.target.value })} />
        <input placeholder="Opmerking" value={formPersoon.opmerking} onChange={e => setFormPersoon({ ...formPersoon, opmerking: e.target.value })} />
        <button onClick={voegPersoonToe}>+ Persoon toevoegen</button>
      </section>

      <nav className="tabs">
        <button onClick={() => setTab("overzicht")} className={tab === "overzicht" ? "active" : ""}>Overzicht</button>
        <button onClick={() => setTab("toevoegen")} className={tab === "toevoegen" ? "active" : ""}>Toevoegen</button>
        <button onClick={() => setTab("encyclopedie")} className={tab === "encyclopedie" ? "active" : ""}>Encyclopedie</button>
        <button onClick={() => setTab("rapport")} className={tab === "rapport" ? "active" : ""}>Rapport</button>
      </nav>

      {tab === "overzicht" && (
        <>
          <section className="stats">
            <div><b>{meds.length}</b><span>Medicijnen</span></div>
            <div><b>{totaalNog}</b><span>Nog te geven</span></div>
            <div><b>{waarschuwingen.length}</b><span>Aandachtspunten</span></div>
          </section>

          <section className="card">
            <h2>Zoeken</h2>
            <input placeholder="Zoek medicijn, reden of dagdeel..." value={zoek} onChange={e => setZoek(e.target.value)} />
          </section>

          <section className="card warning">
            <h2>Aandachtspunten</h2>
            {waarschuwingen.length ? <ul>{waarschuwingen.map((w, i) => <li key={i}>{w}</li>)}</ul> : <p>Geen automatische aandachtspunten.</p>}
          </section>

          <section className="card">
            <h2>Vragen voor arts/apotheek</h2>
            <ul>{vragen.map((v, i) => <li key={i}>{v}</li>)}</ul>
          </section>

          {dagdelen.map(dagdeel => {
            const lijst = gefilterd.filter(m => m.dagdeel === dagdeel);
            if (!lijst.length) return null;

            return (
              <section className={"timecard " + dagdeel.toLowerCase().replace(" ", "")} key={dagdeel}>
                <h2>{dagdeel}</h2>
                {lijst.map((m) => {
                  const echteIndex = meds.indexOf(m);
                  const id = persoon.naam + m.dagdeel + echteIndex;
                  const info = zoekInfo(m.naam);

                  return (
                    <article className={check[id] ? "dose done" : "dose"} key={id}>
                      <div className="toprow">
                        <input type="checkbox" checked={check[id] || false} onChange={() => setCheck({ ...check, [id]: !check[id] })} />
                        <button className="medicineButton" onClick={() => setOpen({ ...open, [id]: !open[id] })}>
                          <span className="medicineName">{m.naam}</span>
                          <span>{m.hoeveelheid || "Hoeveelheid niet ingevuld"}</span>
                        </button>
                      </div>

                      <p className="simple">{m.reden || info?.waarvoor || "Geen reden ingevuld"}</p>

                      {open[id] && (
                        <div className="extra">
                          <p><b>Sterkte:</b> {m.sterkte || "-"}</p>
                          <p><b>Dagdeel:</b> {m.dagdeel}</p>
                          <p><b>Instructie:</b> {m.instructie || "-"}</p>
                          {info && (
                            <>
                              <p><b>Groep:</b> {info.groep}</p>
                              <p><b>Waarvoor:</b> {info.waarvoor}</p>
                              <p><b>Let op:</b> {info.letop}</p>
                            </>
                          )}
                          <button onClick={() => startBewerkMedicijn(echteIndex)}>Bewerk medicijn</button>
                          <button className="danger" onClick={() => verwijderMedicijn(echteIndex)}>Verwijder medicijn</button>
                          <button onClick={() => openApotheek(m.naam)}>Zoek op Apotheek.nl</button>
                        </div>
                      )}
                    </article>
                  );
                })}
              </section>
            );
          })}

          <section className="card">
            <button onClick={() => setCheck({})}>Nieuwe dag starten</button>
          </section>
        </>
      )}

      {tab === "toevoegen" && (
        <section className="card">
          <h2>{editMedIndex === null ? "Medicijn toevoegen" : "Medicijn bewerken"}</h2>
          <form onSubmit={voegOfBewerkMedicijn}>
            <input placeholder="Medicijnnaam" value={formMed.naam} onChange={e => setFormMed({ ...formMed, naam: e.target.value })} />
            <input placeholder="Sterkte, bijvoorbeeld 5 mg" value={formMed.sterkte} onChange={e => setFormMed({ ...formMed, sterkte: e.target.value })} />
            <input placeholder="Hoeveelheid, bijvoorbeeld 1 tablet" value={formMed.hoeveelheid} onChange={e => setFormMed({ ...formMed, hoeveelheid: e.target.value })} />
            <select value={formMed.dagdeel} onChange={e => setFormMed({ ...formMed, dagdeel: e.target.value })}>
              {dagdelen.map(d => <option key={d}>{d}</option>)}
            </select>
            <input placeholder="Waarvoor / reden" value={formMed.reden} onChange={e => setFormMed({ ...formMed, reden: e.target.value })} />
            <input placeholder="Instructie / let op" value={formMed.instructie} onChange={e => setFormMed({ ...formMed, instructie: e.target.value })} />
            <button>{editMedIndex === null ? "Toevoegen" : "Wijziging bewaren"}</button>
          </form>
        </section>
      )}

      {tab === "encyclopedie" && (
        <section className="card">
          <h2>A-Z Medicijn-encyclopedie</h2>
          <input placeholder="Zoek medicijn..." value={zoekUitleg} onChange={e => setZoekUitleg(e.target.value)} />
          <button onClick={() => openApotheek(zoekUitleg || "")}>Zoek op Apotheek.nl</button>

          {uitlegResultaten.map(([naam, data]) => (
            <article className="info" key={naam}>
              <h3>{naam}</h3>
              <p><b>Groep:</b> {data[0]}</p>
              <p><b>Waarvoor:</b> {data[1]}</p>
              <p><b>Let op:</b> {data[2]}</p>
            </article>
          ))}
        </section>
      )}

      {tab === "rapport" && (
        <section className="card">
          <h2>Rapportage</h2>
          <button onClick={kopieerRapport}>Kopieer rapport</button>
          <button onClick={stuurWhatsApp}>Stuur via WhatsApp</button>
          <button onClick={stuurEmail}>Stuur via e-mail</button>
          <textarea readOnly value={maakRapport()} />
        </section>
      )}
    </main>
  );
}

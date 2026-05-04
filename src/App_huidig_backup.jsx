import { useState } from "react";
import "./App.css";

const tijden = ["Ochtend", "Middag", "Avond", "Nacht", "Zo nodig"];

export default function App() {
  const [meds, setMeds] = useState([
    { naam: "Amlodipine", tijd: "Ochtend", hoeveelheid: "1 tablet", reden: "Bloeddruk" },
    { naam: "Paracetamol", tijd: "Middag", hoeveelheid: "2 tabletten", reden: "Pijn" }
  ]);

  const [form, setForm] = useState({
    naam: "",
    tijd: "Ochtend",
    hoeveelheid: "",
    reden: ""
  });

  function toevoegen(e) {
    e.preventDefault();
    if (!form.naam) return alert("Naam invullen");
    setMeds([...meds, form]);
    setForm({ naam: "", tijd: "Ochtend", hoeveelheid: "", reden: "" });
  }

  return (
    <main className="app">
      <h1>MediCheck</h1>

      <form onSubmit={toevoegen}>
        <input placeholder="Naam" value={form.naam} onChange={e => setForm({ ...form, naam: e.target.value })} />
        <input placeholder="Hoeveelheid" value={form.hoeveelheid} onChange={e => setForm({ ...form, hoeveelheid: e.target.value })} />
        <input placeholder="Waarvoor" value={form.reden} onChange={e => setForm({ ...form, reden: e.target.value })} />

        <select value={form.tijd} onChange={e => setForm({ ...form, tijd: e.target.value })}>
          {tijden.map(t => <option key={t}>{t}</option>)}
        </select>

        <button>Toevoegen</button>
      </form>

      {tijden.map(tijd => (
        <div key={tijd} className="blok">
          <h2>{tijd}</h2>
          {meds.filter(m => m.tijd === tijd).map((m, i) => (
            <div key={i} className="item">
              <b>{m.naam}</b> - {m.hoeveelheid}
              <div>{m.reden}</div>
            </div>
          ))}
        </div>
      ))}
    </main>
  );
}

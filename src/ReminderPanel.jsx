import { useEffect, useState } from "react";

export default function ReminderPanel() {
  const [naam, setNaam] = useState("");
  const [tijd, setTijd] = useState("09:00");
  const [items, setItems] = useState(() =>
    JSON.parse(localStorage.getItem("medicatieTijden") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("medicatieTijden", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    const timer = setInterval(() => {
      const nu = new Date().toTimeString().slice(0, 5);
      const vandaag = new Date().toDateString();

      items.forEach((m) => {
        if (m.tijd === nu && m.laatsteMelding !== vandaag) {
          alert("⏰ Tijd voor medicatie: " + m.naam);
          setItems((oud) =>
            oud.map((x) =>
              x.id === m.id ? { ...x, laatsteMelding: vandaag } : x
            )
          );
        }
      });
    }, 30000);

    return () => clearInterval(timer);
  }, [items]);

  function toevoegen() {
    if (!naam.trim()) return;
    setItems([
      ...items,
      {
        id: Date.now(),
        naam: naam.trim(),
        tijd,
        ingenomen: false,
        laatsteMelding: ""
      }
    ]);
    setNaam("");
    setTijd("09:00");
  }

  return (
    <div style={{
      margin: "24px",
      padding: "22px",
      borderRadius: "22px",
      background: "#1f2937",
      color: "white"
    }}>
      <h2>⏰ Medicatie-herinneringen</h2>
      <p>Stel per medicijn een vaste innametijd in.</p>

      <input
        value={naam}
        onChange={(e) => setNaam(e.target.value)}
        placeholder="Medicijnnaam, bijv. Amlodipine"
        style={{ width:"100%", padding:"14px", margin:"8px 0", borderRadius:"14px" }}
      />

      <input
        type="time"
        value={tijd}
        onChange={(e) => setTijd(e.target.value)}
        style={{ width:"100%", padding:"14px", margin:"8px 0", borderRadius:"14px" }}
      />

      <button onClick={toevoegen} style={{
        width:"100%", padding:"14px", borderRadius:"14px",
        background:"#2563eb", color:"white", fontWeight:"bold", border:"none"
      }}>
        Herinnering toevoegen
      </button>

      {items.map((m) => (
        <div key={m.id} style={{
          marginTop:"12px", padding:"14px", borderRadius:"16px",
          background:"#111827"
        }}>
          <strong>{m.naam}</strong><br />
          Dagelijks om {m.tijd}<br /><br />

          <button onClick={() =>
            setItems(items.map(x => x.id === m.id ? { ...x, ingenomen: !x.ingenomen } : x))
          }>
            {m.ingenomen ? "Ingenomen ✓" : "Innemen"}
          </button>

          <button onClick={() =>
            setItems(items.filter(x => x.id !== m.id))
          } style={{ marginLeft:"8px" }}>
            Verwijderen
          </button>
        </div>
      ))}
    </div>
  );
}

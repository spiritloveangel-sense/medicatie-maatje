import { useEffect, useState } from "react";

export default function ReminderPanel() {
  const [naam, setNaam] = useState("");
  const [tijd, setTijd] = useState("09:00");
  const [herinneringen, setHerinneringen] = useState(() => {
    return JSON.parse(localStorage.getItem("medicatieHerinneringen") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("medicatieHerinneringen", JSON.stringify(herinneringen));
  }, [herinneringen]);

  const toevoegen = () => {
    if (!naam.trim()) return;
    setHerinneringen([
      ...herinneringen,
      { id: Date.now(), naam: naam.trim(), tijd, ingenomen: false }
    ]);
    setNaam("");
    setTijd("09:00");
  };

  const nu = new Date();
  const huidigeTijd = nu.toTimeString().slice(0, 5);

  const waarschuwingen = herinneringen.filter(
    h => !h.ingenomen && h.tijd <= huidigeTijd
  );

  return (
    <section className="reminder-box">
      <h2>⏰ Medicatie-herinneringen</h2>

      {waarschuwingen.length > 0 && (
        <div className="reminder-alert">
          <strong>Let op:</strong> er staat medicatie klaar om in te nemen.
        </div>
      )}

      <div className="reminder-form">
        <input
          value={naam}
          onChange={(e) => setNaam(e.target.value)}
          placeholder="Naam medicijn"
        />

        <input
          type="time"
          value={tijd}
          onChange={(e) => setTijd(e.target.value)}
        />

        <button onClick={toevoegen}>Toevoegen</button>
      </div>

      <div className="reminder-list">
        {herinneringen.length === 0 && (
          <p>Nog geen herinneringen ingesteld.</p>
        )}

        {herinneringen.map((h) => (
          <div key={h.id} className="reminder-item">
            <div>
              <strong>{h.naam}</strong><br />
              <span>Dagelijks om {h.tijd}</span>
            </div>

            <div>
              <button onClick={() =>
                setHerinneringen(herinneringen.map(x =>
                  x.id === h.id ? { ...x, ingenomen: !x.ingenomen } : x
                ))
              }>
                {h.ingenomen ? "Ingenomen ✓" : "Innemen"}
              </button>

              <button onClick={() =>
                setHerinneringen(herinneringen.filter(x => x.id !== h.id))
              }>
                Verwijder
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

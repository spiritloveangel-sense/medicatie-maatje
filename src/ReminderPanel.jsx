import { useEffect, useState } from "react";

export default function ReminderPanel() {
  const [medicijn, setMedicijn] = useState("");
  const [tijd, setTijd] = useState("08:00");

  const [herinneringen, setHerinneringen] = useState(() => {
    return JSON.parse(localStorage.getItem("vasteMedicatieTijden") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("vasteMedicatieTijden", JSON.stringify(herinneringen));
  }, [herinneringen]);

  function toevoegen() {
    if (!medicijn.trim()) return;

    setHerinneringen([
      ...herinneringen,
      {
        id: Date.now(),
        medicijn: medicijn.trim(),
        tijd,
        ingenomen: false,
      },
    ]);

    setMedicijn("");
    setTijd("08:00");
  }

  function tijdAanpassen(id, nieuweTijd) {
    setHerinneringen(
      herinneringen.map((h) =>
        h.id === id ? { ...h, tijd: nieuweTijd } : h
      )
    );
  }

  function verwijderen(id) {
    setHerinneringen(herinneringen.filter((h) => h.id !== id));
  }

  return (
    <section className="card">
      <h2>⏰ Vaste medicatie-tijden</h2>
      <p>
        Vul zelf in hoe laat iemand zijn medicijnen wil innemen.
        Bijvoorbeeld 08:00, 12:00, 18:00 of 22:00.
      </p>

      <label>
        Medicijnnaam
        <input
          value={medicijn}
          onChange={(e) => setMedicijn(e.target.value)}
          placeholder="Bijv. Amlodipine"
        />
      </label>

      <label>
        Vaste innametijd
        <input
          type="time"
          value={tijd}
          onChange={(e) => setTijd(e.target.value)}
        />
      </label>

      <button onClick={toevoegen}>
        Tijd toevoegen
      </button>

      <div style={{ marginTop: "16px" }}>
        {herinneringen.length === 0 && (
          <p>Nog geen vaste tijden ingesteld.</p>
        )}

        {herinneringen.map((h) => (
          <div key={h.id} className="card" style={{ marginTop: "12px" }}>
            <strong>{h.medicijn}</strong>

            <label>
              Tijd aanpassen
              <input
                type="time"
                value={h.tijd}
                onChange={(e) => tijdAanpassen(h.id, e.target.value)}
              />
            </label>

            <p>Dagelijks innemen om <strong>{h.tijd}</strong></p>

            <button onClick={() => verwijderen(h.id)}>
              Verwijderen
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

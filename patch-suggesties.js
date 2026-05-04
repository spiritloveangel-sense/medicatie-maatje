const fs = require("fs");
let s = fs.readFileSync("src/App.jsx", "utf8");

if (!s.includes("const medicijnSuggesties")) {
  s = s.replace(
    "const startPersonen = [",
`const medicijnSuggesties = [
  "Amlodipine", "Candesartan", "Duloxetine", "Baclofen", "Oxycodon",
  "Tolperison", "Paracetamol", "Ascorbinezuur", "Omeprazol", "Pantoprazol",
  "Metoprolol", "Furosemide", "Atorvastatine", "Simvastatine", "Metformine",
  "Tramadol", "Ibuprofen", "Naproxen", "Diclofenac", "Oxazepam",
  "Temazepam", "Lorazepam", "Mirtazapine", "Sertraline", "Escitalopram"
];

const startPersonen = [`
  );
}

if (!s.includes("const medicijnHints")) {
  s = s.replace(
    "const persoon = personen[index] || personen[0];",
`const persoon = personen[index] || personen[0];

  const medicijnHints =
    nieuw.naam.length >= 2
      ? medicijnSuggesties
          .filter((m) => m.toLowerCase().includes(nieuw.naam.toLowerCase()))
          .slice(0, 6)
      : [];`
  );
}

const oude = `<input value={nieuw.naam} onChange={(e) => setNieuw({ ...nieuw, naam: e.target.value })} placeholder="Medicijnnaam" />`;

const nieuwe = `<div className="medicijnveld">
            <input
              value={nieuw.naam}
              onChange={(e) => setNieuw({ ...nieuw, naam: e.target.value })}
              placeholder="Medicijnnaam, typ bijv. am of para"
            />

            {medicijnHints.length > 0 && (
              <div className="suggesties">
                {medicijnHints.map((naam) => (
                  <button
                    type="button"
                    key={naam}
                    onClick={() => setNieuw({ ...nieuw, naam })}
                  >
                    {naam}
                  </button>
                ))}
              </div>
            )}

            {nieuw.naam.length >= 2 && medicijnHints.length === 0 && (
              <div className="geenmatch">
                Geen voorbeeld gevonden. Controleer spelling of zoek op Apotheek.nl.
              </div>
            )}
          </div>`;

s = s.replace(oude, nieuwe);

fs.writeFileSync("src/App.jsx", s);
console.log("✅ Medicijnsuggesties toegevoegd met Node.js");

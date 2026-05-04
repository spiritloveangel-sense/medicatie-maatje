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

const oudeInput = `<input value={nieuw.naam} onChange={(e) => setNieuw({ ...nieuw, naam: e.target.value })} placeholder="Medicijnnaam" />`;

const nieuweInput = `<div className="medicijnveld">
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
          </div>`;

s = s.replace(oudeInput, nieuweInput);

fs.writeFileSync("src/App.jsx", s);
console.log("✅ Klaar: suggesties zijn nu echt toegevoegd");

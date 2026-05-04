const fs = require("fs");
let s = fs.readFileSync("src/App.jsx", "utf8");

# 1. Voeg verwijderfunctie toe
if (!s.includes("function persoonVerwijderen")) {
  s = s.replace(
    "function persoonToevoegen() {",
`function persoonVerwijderen() {
    if (personen.length <= 1) return;

    const nieuwe = personen.filter((_, i) => i !== index);
    setPersonen(nieuwe);
    localStorage.setItem("medicheck-personen", JSON.stringify(nieuwe));
    setIndex(0);
  }

function persoonToevoegen() {`
  );
}

# 2. Limiet toevoegen
s = s.replace(
  "function persoonToevoegen() {",
`function persoonToevoegen() {
    if (personen.length >= 10) {
      alert("Maximaal 10 personen toegestaan");
      return;
    }`
);

# 3. Verwijder knop zichtbaar maken
if (!s.includes("🗑 Verwijder persoon")) {
  s = s.replace(
    '<h2>👤 Personen</h2>',
`<h2>👤 Personen</h2>

<button className="delete" onClick={persoonVerwijderen}>
  🗑 Verwijder persoon
</button>`
  );
}

fs.writeFileSync("src/App.jsx", s);
console.log("✅ Personen verwijderen + limiet toegevoegd");

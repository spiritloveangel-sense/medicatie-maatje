const fs = require("fs");
let s = fs.readFileSync("src/App.jsx", "utf8");

// popup state toevoegen
if (!s.includes("toonVerwijderPopup")) {
  s = s.replace(
    "const [nieuw, setNieuw] = useState({",
    `const [toonVerwijderPopup, setToonVerwijderPopup] = useState(false);

  const [nieuw, setNieuw] = useState({`
  );
}

// verwijderfunctie toevoegen
if (!s.includes("function persoonVerwijderen")) {
  s = s.replace(
    "function persoonToevoegen() {",
    `function persoonVerwijderen() {
    const nieuwePersonen = personen.filter((_, i) => i !== index);

    if (nieuwePersonen.length === 0) {
      const leeg = [{
        naam: "",
        leeftijd: "",
        rol: "",
        contact: "",
        notities: "",
        medicijnen: []
      }];
      bewaren(leeg);
      setIndex(0);
      return;
    }

    bewaren(nieuwePersonen);
    setIndex(Math.max(0, index - 1));
  }

  function persoonToevoegen() {`
  );
}

// duidelijke knop onder + persoon toevoegen
if (!s.includes("🗑 Dossier verwijderen")) {
  s = s.replace(
    `<button onClick={persoonToevoegen}>+ Persoon toevoegen</button>`,
    `<button onClick={persoonToevoegen}>+ Persoon toevoegen</button>
          <button className="wide delete" onClick={() => setToonVerwijderPopup(true)}>
            🗑 Dossier verwijderen
          </button>`
  );
}

// popup toevoegen voor einde main
if (!s.includes("className=\"modalbg\"")) {
  s = s.replace(
    "    </main>",
    `      {toonVerwijderPopup && (
        <div className="modalbg">
          <div className="modal">
            <h2>🗑 Dossier verwijderen?</h2>
            <p>
              Weet je zeker dat je <b>{persoon.naam || "dit dossier"}</b> wilt verwijderen?
            </p>
            <p className="klein">Dit verwijdert deze persoon en alle ingevulde medicatie.</p>

            <div className="modalbuttons">
              <button className="copy" onClick={() => setToonVerwijderPopup(false)}>
                Annuleren
              </button>

              <button
                className="delete"
                onClick={() => {
                  persoonVerwijderen();
                  setToonVerwijderPopup(false);
                }}
              >
                Ja, verwijderen
              </button>
            </div>
          </div>
        </div>
      )}

    </main>`
  );
}

fs.writeFileSync("src/App.jsx", s);
console.log("✅ Mooie verwijder-popup toegevoegd");

const fs = require("fs");
let s = fs.readFileSync("src/App.jsx", "utf8");

const insertAfter = `function checkCombinaties(medicijnen) {
  const namen = medicijnen.map((m) => schoon(m.naam));
  return combinatieRegels.filter((regel) =>
    regel.middelen.every((middel) =>
      namen.some((naam) => naam.includes(middel))
    )
  );
}`;

const slimmeCode = `
function heeftGroep(namen, groep) {
  return namen.filter((naam) =>
    groep.some((middel) => naam.includes(middel))
  );
}

function slimmeRisicoCheck(medicijnen) {
  const namen = medicijnen.map((m) => schoon(m.naam));
  const risico = [];

  const sufmakers = [
    "oxycodon", "morfine", "fentanyl", "tramadol", "codeïne",
    "oxazepam", "lorazepam", "temazepam", "diazepam", "alprazolam",
    "baclofen", "tizanidine", "tolperison",
    "quetiapine", "olanzapine", "risperidon", "haloperidol", "aripiprazol",
    "mirtazapine", "amitriptyline", "nortriptyline",
    "gabapentine", "pregabaline"
  ];

  const bloeddruk = [
    "amlodipine", "candesartan", "losartan", "valsartan", "irbesartan",
    "enalapril", "lisinopril", "perindopril", "ramipril",
    "metoprolol", "bisoprolol", "atenolol", "carvedilol",
    "furosemide", "bumetanide", "hydrochloorthiazide", "spironolacton"
  ];

  const nierKalium = [
    "candesartan", "losartan", "valsartan", "irbesartan",
    "enalapril", "lisinopril", "perindopril", "ramipril",
    "spironolacton", "furosemide", "bumetanide", "hydrochloorthiazide"
  ];

  const opioiden = ["oxycodon", "morfine", "fentanyl", "tramadol", "codeïne", "buprenorfine"];
  const benzos = ["oxazepam", "lorazepam", "temazepam", "diazepam", "alprazolam"];
  const antistolling = ["apixaban", "rivaroxaban", "dabigatran", "edoxaban", "acenocoumarol", "fenprocoumon", "clopidogrel", "acetylsalicylzuur"];
  const nsaids = ["ibuprofen", "naproxen", "diclofenac", "celecoxib"];
  const lithium = ["lithium"];
  const psych = ["aripiprazol", "quetiapine", "olanzapine", "risperidon", "haloperidol", "clozapine", "lithium", "valproïnezuur", "lamotrigine"];

  const suf = heeftGroep(namen, sufmakers);
  if (suf.length >= 2) {
    risico.push({
      ernst: "Hoog",
      titel: "Sufheid en valrisico",
      tekst: "Er zijn meerdere medicijnen gevonden die sufheid, duizeligheid of vallen kunnen versterken.",
      advies: "Bespreek dit met arts of apotheek, vooral bij ouderen of als iemand al gevallen is."
    });
  }

  const opio = heeftGroep(namen, opioiden);
  const benzo = heeftGroep(namen, benzos);
  if (opio.length && benzo.length) {
    risico.push({
      ernst: "Hoog",
      titel: "Sterke pijnstiller + rustgevend middel",
      tekst: "Een opioïde pijnstiller samen met een benzodiazepine kan extra sufheid en ademhalingsrisico geven.",
      advies: "Laat deze combinatie controleren door arts of apotheek."
    });
  }

  const bp = heeftGroep(namen, bloeddruk);
  if (bp.length >= 2) {
    risico.push({
      ernst: "Middel",
      titel: "Bloeddrukmiddelen gestapeld",
      tekst: "Er zijn meerdere middelen gevonden die de bloeddruk kunnen verlagen.",
      advies: "Let op duizeligheid, flauwvallen en vallen. Vraag of bloeddrukcontrole nodig is."
    });
  }

  const nk = heeftGroep(namen, nierKalium);
  if (nk.length >= 2) {
    risico.push({
      ernst: "Middel",
      titel: "Nierfunctie en kalium",
      tekst: "Sommige bloeddruk- en plastabletten kunnen invloed hebben op nierfunctie en kalium.",
      advies: "Vraag arts/apotheek wanneer nierfunctie en kalium voor het laatst gecontroleerd zijn."
    });
  }

  const anti = heeftGroep(namen, antistolling);
  const pijn = heeftGroep(namen, nsaids);
  if (anti.length && pijn.length) {
    risico.push({
      ernst: "Hoog",
      titel: "Bloedverdunner + ontstekingsremmer",
      tekst: "Bloedverdunners samen met NSAID-pijnstillers kunnen de kans op bloedingen verhogen.",
      advies: "Gebruik dit niet zomaar samen. Vraag arts/apotheek om controle."
    });
  }

  const lit = heeftGroep(namen, lithium);
  if (lit.length) {
    risico.push({
      ernst: "Hoog",
      titel: "Lithium vraagt extra controle",
      tekst: "Lithium heeft een smalle veilige marge en vraagt controle van bloedspiegel, nieren en schildklier.",
      advies: "Vraag of controles actueel zijn, vooral bij ziekte, uitdroging of nieuwe medicijnen."
    });
  }

  const psy = heeftGroep(namen, psych);
  if (psy.length >= 2) {
    risico.push({
      ernst: "Middel",
      titel: "Meerdere psychische medicaties",
      tekst: "Er zijn meerdere medicijnen gevonden die stemming, gedrag, sufheid of beweging kunnen beïnvloeden.",
      advies: "Laat beoordelen of alles nog nodig is en let op sufheid, trillen, stijfheid of onrust."
    });
  }

  return risico;
}
`;

if (!s.includes("function slimmeRisicoCheck")) {
  s = s.replace(insertAfter, insertAfter + "\n" + slimmeCode);
}

if (!s.includes("const slimmeRisicos")) {
  s = s.replace(
    "const waarschuwingen = useMemo(() => checkCombinaties(persoon.medicijnen), [persoon]);",
    `const waarschuwingen = useMemo(() => checkCombinaties(persoon.medicijnen), [persoon]);
  const slimmeRisicos = useMemo(() => slimmeRisicoCheck(persoon.medicijnen), [persoon]);`
  );
}

s = s.replace(
  /<div><b>\{waarschuwingen\.length\}<\/b><span>aandachtspunten<\/span><\/div>/,
  `<div><b>{waarschuwingen.length + slimmeRisicos.length}</b><span>aandachtspunten</span></div>`
);

if (!s.includes("🧠 Slimme risicocheck")) {
  s = s.replace(
    `<section className="card">
        <h2>⚠️ Belangrijkste aandachtspunten</h2>`,
    `<section className="card">
        <h2>🧠 Slimme risicocheck</h2>
        <p className="helpertekst">
          Deze check kijkt naar risicopatronen, zoals sufheid, vallen, bloeddruk, nieren, lithium en bloedverdunners.
        </p>

        {slimmeRisicos.length === 0 ? (
          <p className="ok">Geen extra risicopatronen gevonden.</p>
        ) : (
          slimmeRisicos.map((r, i) => (
            <div className={\`alert \${r.ernst.toLowerCase()}\`} key={i}>
              <b>{r.ernst} — {r.titel}</b>
              <p>{r.tekst}</p>
              <p><b>Advies:</b> {r.advies}</p>
            </div>
          ))
        )}
      </section>

      <section className="card">
        <h2>⚠️ Belangrijkste aandachtspunten</h2>`
  );
}

s = s.replace(
  `Combinatiecheck / aandachtspunten:
\${waarschuwingen.length
  ? waarschuwingen.map((w) => \`- [\${w.ernst}] \${w.tekst}\`).join("\\n")
  : "- Geen aandachtspunten gevonden in deze eenvoudige checker."}`,
  `Slimme risicocheck:
\${slimmeRisicos.length
  ? slimmeRisicos.map((r) => \`- [\${r.ernst}] \${r.titel}: \${r.tekst} Advies: \${r.advies}\`).join("\\n")
  : "- Geen extra risicopatronen gevonden."}

Combinatiecheck / aandachtspunten:
\${waarschuwingen.length
  ? waarschuwingen.map((w) => \`- [\${w.ernst}] \${w.tekst}\`).join("\\n")
  : "- Geen aandachtspunten gevonden in deze eenvoudige checker."}`
);

fs.writeFileSync("src/App.jsx", s);
console.log("✅ Slimme risicocheck toegevoegd");

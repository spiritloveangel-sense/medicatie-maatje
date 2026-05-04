const fs = require("fs");
let s = fs.readFileSync("src/App.jsx", "utf8");

const nieuweLijst = `const medicijnSuggesties = [
  "Amlodipine", "Candesartan", "Duloxetine", "Baclofen", "Oxycodon",
  "Tolperison", "Paracetamol", "Ascorbinezuur",

  "Omeprazol", "Pantoprazol", "Esomeprazol", "Lansoprazol",
  "Metoprolol", "Bisoprolol", "Atenolol", "Carvedilol",
  "Furosemide", "Bumetanide", "Hydrochloorthiazide", "Spironolacton",
  "Atorvastatine", "Simvastatine", "Rosuvastatine",
  "Metformine", "Gliclazide", "Insuline", "Empagliflozine", "Semaglutide",

  "Enalapril", "Lisinopril", "Perindopril", "Losartan", "Valsartan",
  "Irbesartan", "Ramipril",

  "Tramadol", "Morfine", "Fentanyl", "Codeïne",
  "Ibuprofen", "Naproxen", "Diclofenac", "Celecoxib",

  "Oxazepam", "Temazepam", "Lorazepam", "Diazepam", "Alprazolam",
  "Mirtazapine", "Sertraline", "Escitalopram", "Citalopram", "Fluoxetine",
  "Venlafaxine", "Quetiapine", "Olanzapine", "Risperidon", "Haloperidol",

  "Levothyroxine", "Thiamazol", "Prednisolon", "Dexamethason",
  "Salbutamol", "Formoterol", "Salmeterol", "Budesonide", "Tiotropium",
  "Montelukast",

  "Apixaban", "Rivaroxaban", "Dabigatran", "Acenocoumarol", "Fenprocoumon",
  "Clopidogrel", "Acetylsalicylzuur",

  "Amoxicilline", "Doxycycline", "Azitromycine", "Ciprofloxacine",
  "Nitrofurantoïne", "Fosfomycine",

  "Cetirizine", "Loratadine", "Desloratadine", "Fexofenadine",
  "Macrogol", "Lactulose", "Bisacodyl", "Loperamide",
  "Metoclopramide", "Domperidon", "Ondansetron"
];`;

s = s.replace(/const medicijnSuggesties = \[[\s\S]*?\];/, nieuweLijst);

fs.writeFileSync("src/App.jsx", s);
console.log("✅ Medicijn-suggestielijst uitgebreid");

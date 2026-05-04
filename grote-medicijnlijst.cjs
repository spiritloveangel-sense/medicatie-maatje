const fs = require("fs");
let s = fs.readFileSync("src/App.jsx", "utf8");

const lijst = `const medicijnSuggesties = [
  "Paracetamol", "Ibuprofen", "Naproxen", "Diclofenac", "Celecoxib",
  "Tramadol", "Oxycodon", "Morfine", "Fentanyl", "Codeïne", "Buprenorfine",

  "Amlodipine", "Candesartan", "Losartan", "Valsartan", "Irbesartan",
  "Enalapril", "Lisinopril", "Perindopril", "Ramipril",
  "Metoprolol", "Bisoprolol", "Atenolol", "Carvedilol",
  "Furosemide", "Bumetanide", "Hydrochloorthiazide", "Spironolacton",
  "Diltiazem", "Verapamil", "Digoxine", "Isosorbidedinitraat",

  "Atorvastatine", "Simvastatine", "Rosuvastatine", "Pravastatine",
  "Ezetimib",

  "Metformine", "Gliclazide", "Insuline", "Insuline glargine",
  "Insuline aspart", "Empagliflozine", "Dapagliflozine",
  "Semaglutide", "Liraglutide", "Sitagliptine",

  "Omeprazol", "Pantoprazol", "Esomeprazol", "Lansoprazol",
  "Famotidine", "Macrogol", "Lactulose", "Bisacodyl", "Loperamide",
  "Metoclopramide", "Domperidon", "Ondansetron",

  "Duloxetine", "Amitriptyline", "Nortriptyline", "Sertraline",
  "Citalopram", "Escitalopram", "Fluoxetine", "Paroxetine",
  "Venlafaxine", "Mirtazapine", "Bupropion", "Trazodon",

  "Lithium", "Aripiprazol", "Quetiapine", "Olanzapine",
  "Risperidon", "Haloperidol", "Clozapine", "Paliperidon",
  "Lamotrigine", "Valproïnezuur", "Carbamazepine",

  "Oxazepam", "Temazepam", "Lorazepam", "Diazepam", "Alprazolam",
  "Zolpidem", "Zopiclon",

  "Baclofen", "Tolperison", "Tizanidine", "Gabapentine",
  "Pregabaline", "Levodopa", "Pramipexol", "Ropinirol",

  "Levothyroxine", "Thiamazol", "Prednisolon", "Dexamethason",
  "Hydrocortison",

  "Salbutamol", "Formoterol", "Salmeterol", "Budesonide",
  "Fluticason", "Tiotropium", "Ipratropium", "Montelukast",

  "Apixaban", "Rivaroxaban", "Dabigatran", "Edoxaban",
  "Acenocoumarol", "Fenprocoumon", "Clopidogrel",
  "Acetylsalicylzuur", "Carbasalaatcalcium",

  "Amoxicilline", "Amoxicilline clavulaanzuur", "Doxycycline",
  "Azitromycine", "Claritromycine", "Ciprofloxacine",
  "Nitrofurantoïne", "Fosfomycine", "Metronidazol", "Flucloxacilline",

  "Cetirizine", "Loratadine", "Desloratadine", "Fexofenadine",
  "Levocetirizine",

  "Ascorbinezuur", "Colecalciferol", "Calciumcarbonaat",
  "Foliumzuur", "Cyanocobalamine", "Ferrofumaraat",

  "Allopurinol", "Colchicine", "Tamsulosine", "Finasteride",
  "Solifenacine", "Oxybutynine",

  "Estradiol", "Progesteron", "Levonorgestrel", "Ethinylestradiol",

  "Aciclovir", "Valaciclovir", "Fluconazol", "Miconazol",
  "Terbinafine"
];`;

s = s.replace(/const medicijnSuggesties = \[[\s\S]*?\];/, lijst);

fs.writeFileSync("src/App.jsx", s);
console.log("✅ Grote medicijnlijst toegevoegd");

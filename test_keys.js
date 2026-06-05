const XLSX = require("xlsx");
const workbook = XLSX.readFile("dataset/Dataset_Master_1000_Laptop_SPK.xlsx");
const sheet = workbook.Sheets['Dataset 1000 Laptop'];
const jsonData = XLSX.utils.sheet_to_json(sheet);
const storages = new Set(jsonData.map(r => r['Storage GB (C4)']));
const rams = new Set(jsonData.map(r => r['RAM GB (C3)']));
console.log("Unique Storages:", Array.from(storages));
console.log("Unique RAMs:", Array.from(rams));

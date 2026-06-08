/* eslint-disable @typescript-eslint/no-require-imports */
const XLSX = require("xlsx");
const workbook = XLSX.readFile("dataset/Dataset_Master_1000_Laptop_SPK.xlsx");
const sheet = workbook.Sheets[workbook.SheetNames[0]];

const rawRows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
let headerRowIndex = 0;
for (let i = 0; i < rawRows.length; i++) {
  const rowStr = String(rawRows[i]).toLowerCase();
  if (
    (rowStr.includes("nama") || rowStr.includes("laptop") || rowStr.includes("model")) &&
    (rowStr.includes("harga") || rowStr.includes("price") || rowStr.includes("estimasi"))
  ) {
    headerRowIndex = i;
    break;
  }
}

const jsonData = XLSX.utils.sheet_to_json(sheet, { range: headerRowIndex });
console.log(jsonData.slice(0, 3));

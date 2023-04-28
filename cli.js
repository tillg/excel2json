#!/usr/bin/env node

const fs = require('fs');
const XLSX = require('xlsx');
const excel2json = require('./excel2json');

const inputExcelFile = process.argv[2];
const outputJsonFile = process.argv[3];

if (!inputExcelFile || !outputJsonFile) {
    console.error('Usage: excel2json <input_excel_file> <output_json_file>');
    process.exit(1);
}

if (!fs.existsSync(inputExcelFile)) {
    console.error(`Error: The input file '${inputExcelFile}' does not exist.`);
    process.exit(1);
}

const workbook = XLSX.readFile(inputExcelFile);
const firstSheetName = workbook.SheetNames[0];
const firstWorksheet = workbook.Sheets[firstSheetName];

const jsonData = excel2json(firstWorksheet);

fs.writeFileSync(outputJsonFile, JSON.stringify(jsonData, null, 2));

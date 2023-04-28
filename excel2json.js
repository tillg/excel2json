
const XLSX = require('xlsx');

function excel2json(worksheet) {
    const headers = [];
    const data = [];

    const range = XLSX.utils.decode_range(worksheet['!ref']);

    for (let col = range.s.c; col <= range.e.c; col++) {
        const header = XLSX.utils.encode_cell({ c: col, r: range.s.r });
        headers[col] = worksheet[header].v;
    }

    for (let row = range.s.r + 1; row <= range.e.r; row++) {
        const rowData = {};

        for (let col = range.s.c; col <= range.e.c; col++) {
            const cell = XLSX.utils.encode_cell({ c: col, r: row });
            rowData[headers[col]] = worksheet[cell]?.v;
        }

        data.push(rowData);
    }

    return data;
}

module.exports = excel2json;

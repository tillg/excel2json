const XLSX = require('xlsx');
const excel2son = require('./excel2json');

describe('excelToJson', () => {
    test('converts an Excel worksheet to JSON', () => {
        // Create a simple Excel worksheet with headers and two rows of data
        const headers = ['Name', 'Age'];
        const data = [
            { Name: 'Alice', Age: 30 },
            { Name: 'Bob', Age: 25 },
        ];

        // Convert the data array to an array of arrays for the worksheet
        const dataArray = data.map((row) => headers.map((header) => row[header]));

        // Create the worksheet by concatenating the headers and dataArray
        const ws = XLSX.utils.aoa_to_sheet([headers].concat(dataArray));

        const jsonOutput = excel2son(ws);

        expect(jsonOutput).toEqual(data);
    });
});

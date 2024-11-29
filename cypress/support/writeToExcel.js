const XLSX = require('xlsx');

function writeToExcel(dataArray, filePath) {
    // Create a new workbook and a new worksheet
    const wb = XLSX.utils.book_new();
    
    // Prepare data: convert the array of names into a 2D array (array of arrays)
    const wsData = dataArray.map(name => [name]); // Each name in a new row

    // Create a worksheet
    const ws = XLSX.utils.aoa_to_sheet([['ProfileLinks'], ...wsData]); // Add header

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Names');

    // Write the workbook to a file
    XLSX.writeFile(wb, filePath);
}

module.exports = { writeToExcel };

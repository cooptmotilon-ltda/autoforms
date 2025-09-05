/**
 * Gets the plates and internal data within the data book spreadsheet
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} dataBook - the data book reference
 * @param {string} dataSheetName - the sheet with the data within the book
 * @returns {Array<Array<string>>} array with [internal, plate]
 */
function getData(dataBook, dataSheetName) {
  const data_sheet = dataBook.getSheetByName(dataSheetName);
  const data = [];

  // skip headers config
  const lastRowWithData = data_sheet.getLastRow();
  const firstDataRow = 2; // skip header (row 1)
  const totalDataRows = lastRowWithData - firstDataRow + 1;

  const internal_data_range = data_sheet
    .getRange(firstDataRow, 1, totalDataRows, 1)
    .getValues();
  const plates_data_range = data_sheet
    .getRange(firstDataRow, 2, totalDataRows, 1)
    .getValues(); //

  for (let i = 0; i < totalDataRows; i++) {
    data.push([
      internal_data_range[i].toString(),
      plates_data_range[i].toString(),
    ]);
  }

  return data.filter(String);
}

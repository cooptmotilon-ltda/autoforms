/**
 * Automatizes the form creation using a Google forms base form and Google spreadsheets data book with the cloning info
 * @param {string} baseFormID - the Google Forms ID
 * @param {string} dataBookID - the Google Spreadsheet ID with the data
 * @param {string} dataSheetName - the Google Spreadsheet's sheet name with the data
 *  */
function makeForms(baseFormID, dataBookID, dataSheetName) {
  const dataBook = SpreadsheetApp.openById(dataBookID);
  const formBaseFile = DriveApp.getFileById(baseFormID);

  const internalAndPlatesData = getData(dataBook, dataSheetName);

  const links = [];

  let createdFormsCount = 0;
  const targetFormsCount = internalAndPlatesData.length;

  try {
    internalAndPlatesData.forEach((data) => {
      // create copy of form and get the id
      const newFormID = FormApp.openById(
        formBaseFile.makeCopy(data[1]).getId()
      );

      // config the form
      newFormID
        .setTitle(`INTERNO ${data[0]} - PLACA ${data[1]}`)
        .setAcceptingResponses(true); // accept responses

      links.push([`${data[1]}`, `${newFormID.getPublishedUrl()}`]); // push to links array ["AAAXXX", "FORM.URL"]

      createdFormsCount = createdFormsCount + 1;

      Logger.log(`Progreso: ${(100 / targetFormsCount) * createdFormsCount}%`);
    });
  } catch (err) {
    Logger.log(`❌ -> ${err}`);
  }

  Logger.log(`✅ ${createdFormsCount}/${targetFormsCount} formularios creados`);

  Logger.log(links);
}

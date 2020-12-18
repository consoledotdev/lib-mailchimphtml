/**
 * Mailchimp HTML Apps Script Library
 *
 * A Google Apps Script Library to generate the HTML for MailChimp. Assumes
 * mc-template.html exists in the calling script.
 *
 * Called from within the template file. Example:
 *
 * `<? var data = getData('All Tools!A2:K31', 3); ?>`
 *
 * where `All Tools!A2:K31` defines the Sheet name and range and `3` is the
 * index of the column that contains the scheduled for date.
 *
 */

function getData(range, scheduledForIndex) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  // https://developers.google.com/apps-script/reference/spreadsheet/sheet#getrangea1notation
  var range = spreadsheet.getRange(range);
  var values = range.getValues();

  var newsletterDate = getNextThurs(true);
  var betaPrograms = [];

  for (var row in values) {
    var scheduledFor = new Date(values[row][scheduledForIndex]);

    // Only show the ones scheduled for the next newsletter
    if (scheduledFor.getUTCFullYear() == newsletterDate.getUTCFullYear()
        && scheduledFor.getUTCMonth() == newsletterDate.getUTCMonth()
        && scheduledFor.getUTCDate() == newsletterDate.getUTCDate()) {
          Logger.log('Selecting: ' + values[row]);
          betaPrograms.push(values[row])
    }
  }

  return betaPrograms;
}

function getNextThurs(asDate = false) {
  var resultDate = new Date();

  // To get the next occurrance of a particular day of the week:
  // https://stackoverflow.com/a/1579109
  var thursday = 4; // Thursday
  var now = new Date();
  resultDate.setDate(now.getDate() + (thursday + (7 - now.getDay())) % 7);

  if (asDate) {
    return resultDate;
  } else {
    // To add leading zeros: https://stackoverflow.com/a/1579109
    return resultDate.getFullYear()
      + '-'
      + ('0' + (resultDate.getMonth() + 1)).slice(-2)
      + '-'
      + ('0' + resultDate.getDate()).slice(-2);
  }
}

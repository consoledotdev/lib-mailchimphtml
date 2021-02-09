/**
 * Mailchimp HTML Apps Script Library
 *
 * A Google Apps Script Library to generate the HTML for MailChimp.
 *
 * Called from within the template file. Example:
 *
 * `<? var data = getData('All Tools!A2:K31'); ?>`
 *
 * where `All Tools!A2:K31` defines the Sheet name with a header column
 * named "Scheduled for". Specify the optional second parameter if that field
 * name is different.
 *
 */

function getData(range, scheduledForField = "Scheduled for") {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    // https://developers.google.com/apps-script/reference/spreadsheet/sheet#getrangea1notation
    var range = spreadsheet.getRange(range);
    var values = range.getValues();

    var newsletterDate = getNextThurs(true);
    var data = [];

    // Get the index for the field we want
    // Assumes the first row is a header row
    for (const [key, value] of Object.entries(values[0])) {
        if (value == scheduledForField) {
            var scheduledForIndex = key;
        }
    }

    for (var row in values) {
        var scheduledFor = new Date(values[row][scheduledForIndex]);

        // Only show the ones scheduled for the next newsletter
        if (scheduledFor.getUTCFullYear() == newsletterDate.getUTCFullYear()
            && scheduledFor.getUTCMonth() == newsletterDate.getUTCMonth()
            && scheduledFor.getUTCDate() == newsletterDate.getUTCDate()) {
                Logger.log('Selecting: ' + values[row]);
                data.push(values[row])
        }
    }

    return data;
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

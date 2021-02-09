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
 * Returns an array of rows that are selected for publication. Key names are the
 * header columns.
 *
 */

function getData(range, scheduledForField = "Scheduled for") {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    // https://developers.google.com/apps-script/reference/spreadsheet/sheet#getrangea1notation
    var range = spreadsheet.getRange(range);
    var values = range.getValues();

    var newsletterDate = getNextThurs(true);
    var data = [];

    // Get the index for the "Scheduled for field"
    // Assumes the first row is a header row
    for (const [key, value] of Object.entries(values[0])) {
        if (value == scheduledForField) {
            var scheduledForIndex = key;
        }
    }

    // Loop through every row returned.
    // Only process the rows which are scheduled for next Thursday.
    // Create a new dictionary where the keys are the text column names.
    // Then push that dictionary to the data array for iteration in the
    // template.
    for (var row in values) {
        var scheduledFor = new Date(values[row][scheduledForIndex]);

        // Only process the ones scheduled for the next newsletter
        if (scheduledFor.getUTCFullYear() == newsletterDate.getUTCFullYear()
            && scheduledFor.getUTCMonth() == newsletterDate.getUTCMonth()
            && scheduledFor.getUTCDate() == newsletterDate.getUTCDate()) {

            Logger.log('Selecting: ' + values[row]);

            // Create dictionary with keys as column headers
            keyedRow = {};
            for (const [key, value] of Object.entries(values[row])) {
                var rowKey = values[0][key];
                var rowValue = value;

                Logger.log('Row ' + row + ': k = ' + rowKey + ' ; v = ' + rowValue);
                keyedRow[rowKey] = value;
            }

            // Append ?ref=console.dev to the URL so the site owner knows
            // referrals came from Console. Important when clicks are from an
            // email which will otherwise have no referrer.
            // Unfortunately Google Apps Script does not support URL or
            // URLSearchParams interfaces :(
            Logger.log('Processing URL: ' + keyedRow['URL']);
            var url = keyedRow['URL'];
            var separator = url.indexOf('?') > -1 ? '&' : '?';
            url += separator + encodeURIComponent('ref')
                + '=' + encodeURIComponent('console.dev');
            keyedRow['URL'] = url
            Logger.log('Set URL: ' + url.toString());

            Logger.log('Pushing: ' + keyedRow);
            data.push(keyedRow)
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

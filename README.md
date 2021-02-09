# Lib Mailchimp HTML

A [Google Apps Script](https://developers.google.com/apps-script/overview)
[library](https://developers.google.com/apps-script/guides/libraries) to
generate the HTML for copying into Mailchimp.

Documentation within the code.

## Open development

This repository is public, but is not currently open source. Feel free to read,
copy, or use any aspect of this code. However, it is published without support,
warranty, or guarantees of any kind. We have opened the repo to give a view
into how we run [Console](https://console.dev) rather than for it to be
independent, release-quality code.

## Local development

This script is [bound](https://developers.google.com/apps-script/guides/bound)
to the Google Sheet container. You can access it from Tools > Script Editor
within the sheet but using `clasp` is preferred.

1. [Install `clasp`](https://developers.google.com/apps-script/guides/clasp).
2. Clone this repo.
3. Ensure you have the latest copy of the code by cloning into the repo:

`gclasp clone 1UNp-1nYZjDs8BUqkYBzHSVpPg0oKkZ87H8-_yIAbGwA26rLG9nAH21GT`

4. `npm install`
5. `cp node_modules/urijs/src/URI.js .`
6. Push any changes up to the live version: `clasp push` or have it watch for
   changes with `clasp push --watch`.

## Debugging

Check the live [Apps Script dashboard](https://script.google.com/home/all).

## Publishing a new version

1. `gclasp push 1UNp-1nYZjDs8BUqkYBzHSVpPg0oKkZ87H8-_yIAbGwA26rLG9nAH21GT`
2. Load [the web editor](https://script.google.com/a/console.dev/d/1UNp-1nYZjDs8BUqkYBzHSVpPg0oKkZ87H8-_yIAbGwA26rLG9nAH21GT/edit).
3. File > Manage versions > Save new version
4. Update any scripts that use this as a dependancy.

import fs from "fs";
import {google} from "googleapis";
import readline from "readline";

let data = '';

export class SheetsAPI {
  constructor(mmrs){
    this.mmrs = mmrs;
  }


  updateSheet() {

    data = this.mmrs;

    const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
    const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Sheets API.
      authorize(JSON.parse(content), this.changeMMRS);
    });

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    function authorize(credentials, callback) {
      const {client_secret, client_id, redirect_uris} = credentials.installed;
      const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
      });
    }
  }

  changeMMRS(auth) {

    const sheets = google.sheets({version: 'v4', auth});

    for(let i=0; i<data.length;i++){
      let range ='Sheet1!B' + (i+2);



      sheets.spreadsheets.values.update({
        spreadsheetId: '',
        range: range,
        valueInputOption: 'RAW',
        resource: {
          values: [[data[i].MMR]]
        }
      }, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("cells updated", result.updatedCells);
        }
      })
    }


  }
}



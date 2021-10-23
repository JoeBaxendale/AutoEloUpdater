import {Buffer} from "buffer";
import fetch from "node-fetch";

export class EloAPI {
  constructor(userId, password) {
    this.userId = userId;
    this.password = password;
  }


   async getElo(playerId){
    let token = Buffer.from(this.userId + ':' + this.password).toString("base64");
     return await fetch('https://api.statsdb.net/r6/player/' + playerId, {
       credentials: 'include',
       headers: {
         'Authorization': 'Basic ' + token
       }
     })
       .then((resp) => {
         return resp.json();
       })
       .catch((error) => {
         console.error('Error:', error);
       });
   }

}





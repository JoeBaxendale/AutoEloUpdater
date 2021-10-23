import {EloAPI} from "file:///C:/Users/Joe/Desktop/Github/AutoELOUpdater/js/EloAPI.js";
import {SheetsAPI} from "file:///C://Users//Joe//Desktop//Github//AutoELOUpdater//js//SheetsAPI.js";


async function main() {
  let count = 0;
  let playerIds = [
  '9b7427ab-0915-4a02-8820-2b31a5d8a152',
  'bdef092c-daf6-4907-bd4b-3fe4fd622add',
  '407976b8-372b-4b3d-a22d-8462d39e3e3b',
  'dd0e9fef-2086-435c-ae30-d5a7cb64103a',
  '754a3834-82d8-4010-bfd0-9008ccf320e7',
  'ac253958-7367-4a49-a77a-fb9722a19ee3',
  '6d56bbfb-3644-4001-8841-90a15325ee4e',
  '78fbff79-8a0b-4ebe-8786-c23fbff80703',
  'c8940fe4-e37f-45a2-9826-14e9697c93f3',
  'b71ec9b8-9f15-4949-99db-5b18d3075692',
  '9c3f513c-fec7-4f23-a43d-1af7137830a8',
  'fe12ee4a-c9f4-4150-8870-b41e2314db9f'
];    // will be used to get all of them at once


  let mmrs = [];
  let userId = ;
  let password = ;
  let API = new EloAPI(userId,password);

  for(let i=0;i<playerIds.length;i++){

    let prom = API.getElo(playerIds[i]);
    await prom.then((data) => {
      let player = data.payload;
      mmrs.push({
        Name: player.user.nickname,
        MMR: player.stats.seasonal.ranked.mmr
      });
      console.log(mmrs);
      }
    );

  }

  console.log(count++)

  let sheet = new SheetsAPI(mmrs);
  sheet.updateSheet();
}

main()

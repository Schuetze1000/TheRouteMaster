import * as cheerio from "cheerio";
import axios from "axios";
import * as fs from 'fs';

async function getICS() {
  const name_list: string[] = [];
  const uid_list: string[] = [];
  try {
    const response = await axios.get(
      "https://vorlesungsplan.dhbw-mannheim.de/ical.php"
    );
   
    const data_html = cheerio.load(response.data);
    const elements = data_html('select[name="Kurse"] option');

    for (let y = 0; y < elements.length; y++) {
      name_list.push(elements.get(y).attributes[0].value);
      uid_list.push(elements.get(y).attributes[1].value);
    }

    for (let x = 0; x < name_list.length; x++) {
      console.log(`Name= ${name_list[x]}; UID= ${uid_list[x]}`);
    }
    
    for (let x = 1; x < name_list.length; x++) {
      const response2 = await axios.get(`http://vorlesungsplan.dhbw-mannheim.de/ical.php?uid=${uid_list[x]}`);
      fs.writeFile(`./ics/${uid_list[x]}.ics`, response2.data, err => {
        if (err) {
          console.error(err);
        }
        else {
          console.log(`Downloaded ICS Name= ${name_list[x]}; UID= ${uid_list[x]}`)
        }
      });
    }

  } catch (error) {
    console.error(error);
  }
}

getICS()
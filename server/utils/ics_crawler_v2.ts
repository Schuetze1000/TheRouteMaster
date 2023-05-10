import * as cheerio from "cheerio";
import axios from "axios";
import * as fs from "fs";
import crypto from "crypto";

export async function getUIDS(): Promise<[string[],string[]]> {
  try {
    const name_list: string[] = [];
    const uid_list: string[] = [];

    const response = await axios.get("https://vorlesungsplan.dhbw-mannheim.de/ical.php");

    const data_html = cheerio.load(response.data);
    const elements = data_html('select[name="Kurse"] option');

    for (let y = 1; y < elements.length; y++) {
      name_list.push(elements.get(y).attributes[0].value);
      uid_list.push(elements.get(y).attributes[1].value);
    }
    return [name_list, uid_list];

  } catch (error) {
    console.error(error);
    return undefined
  }
}

export async function getICS(name_list: string[] = [], uid_list: string[] = []): Promise<string[]>{
  const hash_list: string[] = [];
  for (let x = 0; x < name_list.length; x++) {
    const path = `../data/ics/${uid_list[x]}.ics`;
    if (!fs.existsSync(path)) {
      const response2 = await axios.get(`http://vorlesungsplan.dhbw-mannheim.de/ical.php?uid=${uid_list[x]}`);
      fs.writeFile(path, response2.data, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Downloaded ICS Name= ${name_list[x]}; UID= ${uid_list[x]}`);
        }
        hash_list.push(`UID= ${uid_list[x]}; Hash:` + crypto.createHash("sha1").update(response2.data).digest("base64"));
      });
    } else {
      console.log(`ICS-File Name= ${name_list[x]}; UID= ${uid_list[x]} exists!`);
    }
  }
  console.log(hash_list);
  return hash_list;
}

/** 
getUIDS().then((value) => {
  for (let x = 0; x < value[0].length; x++) {
    console.log(`Name= ${value[0][x]}; UID= ${value[1][x]}`);
  }
});
*/
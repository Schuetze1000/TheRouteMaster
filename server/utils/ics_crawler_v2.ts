import * as cheerio from "cheerio";
import axios from "axios";
import * as cliProgress from 'cli-progress';


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

export async function getICS_Data(name_list: string[] = [], uid_list: string[] = []): Promise<string[]>{
  const ics_list: string[] = [];
  const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  bar1.start(name_list.length, 0);

  for (let x = 0; x < name_list.length; x++) {
    const path = `../data/ics/${uid_list[x]}.ics`;
    const response2 = await axios.get(`http://vorlesungsplan.dhbw-mannheim.de/ical.php?uid=${uid_list[x]}`);
    ics_list.push(response2.data);
    bar1.update(x);
  } 
  bar1.stop();
  return ics_list;
}


getUIDS().then((value) => {
  getICS_Data(value[0], value[1]).then((value) => {
    
  });
  /**for (let x = 0; x < value[0].length; x++) {
    console.log(`Name= ${value[0][x]}; UID= ${value[1][x]}`);
  }*/
});

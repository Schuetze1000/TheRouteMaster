import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import deLocale from "@fullcalendar/core/locales/de";
import { Calendar } from "fullcalendar";
import { Interface } from "readline";
import { useState, useEffect } from "react";
import { axiosInstance } from "../hooks/jwtAuth";

var eventsL = [
	{
		title: "Kryptologie Raum 161C", //Titel der Vorlesung, wird im Eventfeld angezeigt
		start: "20230601T100000", //Anfangsdatum und Zeit des Events
		end: "20230601T120000", //Enddatum und Zeit des Events
		url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
	},
	{
		title: "Mathe",
		start: "2023-06-02T13:00:00",
		end: "2023-06-02T18:00:00",
	},
	// { id: '3',  title: 'BWL Raum 161C', start: '20230530T170000', end: '20230-30T190000'},
];

//Volle Dokumentation bei https://fullcalendar.io/docs
const testEvent = {
	id: "3",
	title: "BWL Raum 161C",
	start: "20230530T170000",
	end: "20230-30T190000",
	url: "https://www.youtube.com/watch?v=4f_mIRrns2U",
};

function FullCalendarApp() {
	interface IEvent {
		title: string;
		start: string;
		end: string;
	}
	const [iEvent, setEvent] = useState<IEvent[]>();
	var currentHash = "";
	var kursName = "TINF22CS1";
	var ICSString = "";

	/** 
  const optionsGetICS = {
  method: "GET",
  url: "/ics/getavailableics",
  withCredentials: true,
};
axiosInstance(optionsGetICS)
  .then((resAvailableIcs) => {
    var icsArray: [{ value: string; label: string }] = [{ label: resAvailableIcs.data[0].name, value: resAvailableIcs.data[0].uid }];
    for (let index = 1; index < resAvailableIcs.data.length; index++) {
      icsArray.push({ label: resAvailableIcs.data[index].name, value: resAvailableIcs.data[index].uid });
    }
    setICSNameList(icsArray);
  })
  .catch((error) => {
    if (error.response.status >= 400 && error.response.status < 500) {
      window.location.href = "/login";
    }
  });
*/

	useEffect(() => {
    var evntLst: IEvent[] = [
      {
        title: "",
        start: "",
        end: "",
      },
    ];
		const optionsGetICS = {
			method: "GET",
			url: "/ics/getics",
			withCredentials: true,
		};
		axiosInstance(optionsGetICS).then((resAvailableIcs) => {

			evntLst.push(testEvent); //Hat hier nur debuggende Funktion, ähnlich einem Print-statement, das signalisiert, dass dieser Codeblock abgearbeitet wird

			if (resAvailableIcs.data.hash == currentHash) {
				currentHash = resAvailableIcs.data.hash;
			} else {
				currentHash = resAvailableIcs.data.hash;
				kursName = resAvailableIcs.data.name;
				ICSString = resAvailableIcs.data.data;
				console.log({ ICSString });
				const rawEvents = ICSString.split("BEGIN:VEVENT");
				for (let i = 1; i < rawEvents.length; i++) {
					var singularEvent = rawEvents[i].split("\n");
					console.log({ singularEvent });
					evntLst.push({
						title: singularEvent[3].replace("SUMMARY:", "") + "     " + singularEvent[2].replace("LOCATION:", ""),
						start: singularEvent[4].replace("DTSTART:", ""),
						end: singularEvent[5].replace("DTEND:", ""),
					});
				}
        setEvent(evntLst);
			}
		});

		console.log("DEBUG");
		console.log({ evntLst });
	}, []);

	return (
		<div className="App">
			<FullCalendar
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
				//Ab hier findet Customization statt, um den Kalender an Bedürfnisse/Gewohnheiten anzupassen
				initialView="timeGridWeek" //Wochendarstellung, die Tage werden als Spalten nebeneinander angezeigt
				customButtons={{
					kursButton: {
						text: kursName,
						click: function () {
							window.location.replace("https://www.youtube.com/watch?v=l3Z7s1S1B8M");
						},
					},
				}}
				headerToolbar={{
					//Die Toolbar über dem eigentlichen Kalender enthält per Default Knöpfe und Funktionalitäten z.B. zum Umschalten auf Tages- oder Monatsansicht, oder zum Spulen der Wochen
					center: "title", //Es das Anfangs- und Enddatum der aktuell dargestellten Woche angezeigt
					left: "kursButton", //Buttons zum Umschalten von Monats- und Wochenansicht
					right: "dayGridMonth timeGridWeek prev,today,next", //Die Buttons zum Navigieren der Wochen. Trennung durch Leerzeichen statt Komma trennt die Buttons visuell voneinander. Komma und Leerzeichen sorgen für eine whacke Darstellung
				}}
				firstDay={1} //Der Montag ist der erste dargestellte Tag
				slotMinTime={"06:00:00"} //Die frühste Uhrzeit, die dargestellt wird
				slotMaxTime={"22:00:00"} //Die späteste Uhrzeit, die dargestellt wird
				slotDuration={"00:30:00"} //Die Zeitspanne, die ein Slot beinhaltet, kleinere Slots bedeuten, dass der gesamte Kalender länger wird
				hiddenDays={[0]} //Der Sonntag wird versteckt
				eventColor="#a01b1b" //Farbe der Event-Felder
				eventTextColor="black" //Farbe der Schrift in den Eventfeldern
				nowIndicator //Ein roter Strich, welcher die aktuelle Uhrzeit anzeigt, wird im Kalender dargestellt
				locale={"de"} //Setzt die Sprache z.B. beim Ausschreiben der Monate und Wochentage auf Deutsch
				allDaySlot={false} //Entfernt den Slot für ganztägige Events
				height={1000} //Die maximale Höhe des Kalenders. Bei Überschreitung werden Scrollbars eingesetzt
				eventTimeFormat={{
					//Format der Zeitdarstellung in den Eventblöcken
					hour: "numeric", //Darstellen der Stunden in der numerischen Form, also ohne führende Nullen bei einer einstelligen Zahl
					minute: "2-digit", //Darstellen der Minuten immer mit zwei Zahlen
					hour12: false, //Die Stunden werden im 1-24 Format angezeigt, und nicht im 1-12 Format, wie per default
				}}
				events={iEvent}
			/>
		</div>
	);
}

export default FullCalendarApp;

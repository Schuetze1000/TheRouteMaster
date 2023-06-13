import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import deLocale from "@fullcalendar/core/locales/de";
import { Calendar } from "fullcalendar";
import { Interface } from "readline";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../hooks/jwtAuth";

//! Use deutschebahnInterfaces as reference for backend-api-response


function FullCalendarApp() {
	const plugins = [ interactionPlugin ];

	const [gridMonth, setGridMonth] = useState(true);
	let rightButton:string = "dayGridMonth prev,today,next";

	
	const [currentView, setCurrentView] = useState("timeGridWeek") 





	const [rightViewButtons, setRightViewButtons] = useState("timeGridWeek prev,today,next")
	const toggleGridButton = () => {
        if (gridMonth == true) {
            setRightViewButtons("timeGridWeek prev,today,next");
			setCurrentView("timeGridWeek")
			setGridMonth(false);
			console.log("Da Cringe")
			
			
        } else {
            setRightViewButtons("dayGridMonth prev,today,next");
			setCurrentView("dayGridMonth")
			setGridMonth(true);
			
			console.log("Da other cringe")
        }
    };
	
	function showRoutes() {

	}

	

	function randomIntFromInterval(min, max) { // min and max included 
		return Math.floor(Math.random() * (max - min + 1) + min)
	  }

	interface IEvent {
		title: string;
		start: string;
		end: string;
		color: string;
		editable: boolean;
		id: string;

	}
	const [iEvent, setEvent] = useState<IEvent[]>();
	var currentHash = "";
	var [kursName, setKursName] = useState<string>("");
	var ICSString = "";

	/*	
	var daTestEvent = [{
		title: "TEST123
		start: "2023-06-09T13:00:00",
		end:  "2023-06-09T15:00:00",
		color: "ffffff",
		editable: true,
		id: "Test123"
	 }]
	*/

	useEffect(() => {
		var routeEvent: IEvent;
		var routeEvents;
		const navGetRoutes = {
			method: "GET",
			url: "/navigation/getallroutes",
			withCredentials: true,
		};
		axiosInstance(navGetRoutes).then((retRoutes) => {
			routeEvents = retRoutes.data
			for (var i = 0; i < routeEvents.length; i++) {
				setEvent(iEvent?.concat([{
					title: "Von " + routeEvents[i].from + " nach " + routeEvents[i].to,
					start: routeEvents[i].routes[0].route[0].types.departure,
					end: routeEvents[i].routes[0].route[0].types.arrival,
					color: "ABCDEF",
					editable: false,
					id: routeEvents[i].routeID,
				}])) 
			}
		}) 


		var evntLst: IEvent[] = [
		{
			title: "",
			start: "",
			end: "",
			color: "",
			editable: true,
			id: "",
		},
		];
		const optionsGetICS = {
			method: "GET",
			url: "/ics/getics",
			withCredentials: true,
		};
		axiosInstance(optionsGetICS).then((resAvailableIcs) => {

			if (resAvailableIcs.data.hash == currentHash) {
				currentHash = resAvailableIcs.data.hash;
			} else {
				currentHash = resAvailableIcs.data.hash;
				setKursName(resAvailableIcs.data.name);
				ICSString = resAvailableIcs.data.data;
				const rawEvents = ICSString.split("BEGIN:VEVENT");

				let colors = ["purple", "green", "red", "cyan", "blue"];

				for (let i = 1; i < rawEvents.length; i++) {
					var singularEvent = rawEvents[i].split("\n");
					evntLst.push({
						title: singularEvent[3].replace("SUMMARY:", "") + "     " + singularEvent[2].replace("LOCATION:", ""),
						start: singularEvent[4].replace("DTSTART:", ""),
						end: singularEvent[5].replace("DTEND:", ""),
						color: colors[randomIntFromInterval(0,5)], // How to change colors
						editable: false,
						id: "ICS_" + i.toString(),
						
					});
				}
        setEvent(evntLst);
        console.log("DEBUG");
		    console.log({ evntLst });
			}
		});
	}, []);

	function DateClick (info) {
		
		var end = new Date(info.dateStr);
		end.setHours(end.getHours() + 1);
		setEvent(iEvent?.concat([{
			title: "",
			start: info.dateStr,
			end: end.toISOString(),
			color: "ffffff",
			editable: true,
			id: "Custom_" + randomIntFromInterval(0,99999).toString(),
			
		}]));
		
		
	}

	


	//TODO Fix custom button damit bei Klick er zwischen Month und Week wechselt @JStahl42
	//TODO Function ist oben bereits integriert (toggleGridButton), muss nur noch in die Custom Buttons eingebaut werden.
	return (
		<div className="App">
			<FullCalendar
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
				//Ab hier findet Customization statt, um den Kalender an Bedürfnisse/Gewohnheiten anzupassen
				initialView= "timeGridWeek" //Wochendarstellung, die Tage werden als Spalten nebeneinander angezeigt
				
				customButtons={{
					toggleButton: {
						text: "Toggle",
						click: toggleGridButton
						
					},

					kursButton: {
						text: kursName,
						click: function () {
							window.location.replace("https://www.youtube.com/watch?v=l3Z7s1S1B8M");
						},
					},

					routeButton: {
						text: "Routen finden",
						click: showRoutes
					}
					
				}}
				headerToolbar={{
					//Die Toolbar über dem eigentlichen Kalender enthält per Default Knöpfe und Funktionalitäten z.B. zum Umschalten auf Tages- oder Monatsansicht, oder zum Spulen der Wochen
					center: "title", //Es das Anfangs- und Enddatum der aktuell dargestellten Woche angezeigt
					left: "kursButton routeButton", //Buttons zum Umschalten von Monats- und Wochenansicht
					right: "toggleButton " + rightViewButtons, //Die Buttons zum Navigieren der Wochen. Trennung durch Leerzeichen statt Komma trennt die Buttons visuell voneinander. Komma und Leerzeichen sorgen für eine whacke Darstellung
				}}
				dateClick={DateClick}
				
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
				selectable={true}
					eventTimeFormat={{
					//Format der Zeitdarstellung in den Eventblöcken
					hour: "numeric", //Darstellen der Stunden in der numerischen Form, also ohne führende Nullen bei einer einstelligen Zahl
					minute: "2-digit", //Darstellen der Minuten immer mit zwei Zahlen
					hour12: false, //Die Stunden werden im 1-24 Format angezeigt, und nicht im 1-12 Format, wie per default
				}}
				events= { iEvent }//{iEvent}
			/>
		</div>
	);
}

export default FullCalendarApp;

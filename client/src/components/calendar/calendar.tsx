import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import deLocale from "@fullcalendar/core/locales/de";
import { Calendar } from "fullcalendar";
import { Interface } from "readline";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../hooks/jwtAuth";

import { IDBStruct, IDBRoutes, ITrain } from "./deutschebahnInterfaces";

function FullCalendarApp() {
	const plugins = [interactionPlugin];

	const [gridMonth, setGridMonth] = useState(true);
	const [currentView, setCurrentView] = useState("timeGridWeek");
	const [iEvent, setEvent] = useState<IEvent[]>();
	const [rightViewButtons, setRightViewButtons] = useState("timeGridWeek prev,today,next");
	const [kursName, setKursName] = useState<string>("");

	var currentHash = "";
	let rightButton: string = "dayGridMonth prev,today,next";
	var ICSString = "";

	interface IEvent {
		title: string;
		start: string;
		end: string;
		color: string;
		editable: boolean;
		id: string;
	}

	function toggleGridButton() {
		if (gridMonth == true) {
			setRightViewButtons("timeGridWeek prev,today,next");
			setCurrentView("timeGridWeek");
			setGridMonth(false);
		} else {
			setRightViewButtons("dayGridMonth prev,today,next");
			setCurrentView("dayGridMonth");
			setGridMonth(true);
		}
	}


	function randomIntFromInterval(min, max) { 
		// min and max included 
		return Math.floor(Math.random() * (max - min + 1) + min); 
	}

	useEffect(() => {
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
		var routeEvents: IDBStruct[];

		const navGetRoutes = {
			method: "GET",
			url: "/navigation/getallroutes",
			withCredentials: true,
		};
		axiosInstance(navGetRoutes).then((retRoutes) => {

			routeEvents = retRoutes.data
			for (var j = 0; j < retRoutes.data.length; j++) {
				
				for (var i = 0; i < routeEvents[j].routes[0].route.length; i++) {
					var title = "Von " + routeEvents[j].routes[0].route[i].types.from + " nach " + routeEvents[j].routes[0].route[i].types.to
					var start
					var end
					console.log("Von " + routeEvents[j].routes[0].route[i].types.from + " nach " + routeEvents[j].routes[0].route[i].types.to)
					console.log("j: " + j + " i: "+ i)
					
					if (routeEvents[j].routes[0].route[i].walk) {
						const routeTrainBefore = routeEvents[j].routes[0].route[i-1].types
						const routeTrainAfter = routeEvents[j].routes[0].route[i+1].types
						title = "WALK"
						if ("plannedArrival" in routeTrainBefore && "plannedDeparture" in routeTrainAfter)  {
							start = routeTrainBefore.plannedArrival
							end = routeTrainAfter.plannedDeparture
						}
					} else {
						const routeTrain = routeEvents[j].routes[0].route[i].types
						if ("plannedArrival" in routeTrain && "plannedDeparture" in routeTrain) {
							var time = new Date(routeTrain.plannedDeparture.toString())
							time.setHours(time.getHours() - 2)
							start = time.toISOString()
							time = new Date(routeTrain.plannedArrival.toString())
							time.setHours(time.getHours() - 2)
							end = time.toISOString()						
							evntLst.push({
								title: title, 
								start:  start,
								end: end,
								color: "purple",
								editable: true,
								id: "",
							
							}); 
						}
					}

					
				}	
			}
			
			
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

					for (let i = 1; i < rawEvents.length; i++) {
						var singularEvent = rawEvents[i].split("\n");
						evntLst.push({
							title: singularEvent[3].replace("SUMMARY:", "") + "     " + singularEvent[2].replace("LOCATION:", ""),
							start: singularEvent[4].replace("DTSTART:", ""),
							end: singularEvent[5].replace("DTEND:", ""),
							color: "red", // How to change colors
							editable: false,
							id: "ICS_" + i.toString(),
						});
					}
					setEvent(evntLst);
					console.log("DEBUG");
					console.log({ evntLst });
				}
			});
		});
	}, []);

	function DateClick(info) {
		var end = new Date(info.dateStr);
		end.setHours(end.getHours() + 1);
		setEvent(
			iEvent?.concat([
				{
					title: "",
					start: info.dateStr,
					end: end.toISOString(),
					color: "ffffff",
					editable: true,
					id: "Custom_" + randomIntFromInterval(0, 99999).toString(),
				},
			])
		);
	}

	
	
	//! Make the calendar responsive. Mabye change on mobile the design to this https://fullcalendar.io/docs/list-view ? @JStahl42
	return (
		<div className="App">
			<FullCalendar
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
				//Ab hier findet Customization statt, um den Kalender an Bedürfnisse/Gewohnheiten anzupassen
				initialView="timeGridWeek" //Wochendarstellung, die Tage werden als Spalten nebeneinander angezeigt
				customButtons={{
					toggleButton: {
						text: "Toggle",
						click: toggleGridButton,
					},

					kursButton: {
						text: kursName,
						click: function () {
							window.location.replace("https://www.youtube.com/watch?v=l3Z7s1S1B8M?autoplay=1&t=10s&mute=1");
						},
					},

				}}
				headerToolbar={{
					//Die Toolbar über dem eigentlichen Kalender enthält per Default Knöpfe und Funktionalitäten z.B. zum Umschalten auf Tages- oder Monatsansicht, oder zum Spulen der Wochen
					center: "title", //Es das Anfangs- und Enddatum der aktuell dargestellten Woche angezeigt
					left: "kursButton", //Kursbutton
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
				events={iEvent} //{iEvent}
			/>
		</div>
	);
}

export default FullCalendarApp;

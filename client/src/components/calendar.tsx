import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import deLocale from '@fullcalendar/core/locales/de';
import { Calendar } from 'fullcalendar';
import { Interface } from 'readline';
import { useEffect, useState } from 'react';

const eventsL = [
  {
    title: "Kryptologie Raum 161C",  //Titel der Vorlesung, wird im Eventfeld angezeigt
    start: '20230601T100000', //Anfangsdatum und Zeit des Events
    end: '20230601T120000',     //Enddatum und Zeit des Events
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    title: 'event 2',
    start: '2023-06-02T13:00:00',
    end: '2023-06-02T18:00:00',
  },
 // { id: '3',  title: 'BWL Raum 161C', start: '20230530T170000', end: '20230-30T190000'},
];

//Volle Dokumentation bei https://fullcalendar.io/docs
const pppppp = {id: '3',  title: 'BWL Raum 161C', start: '20230530T170000', end: '20230-30T190000', url:'https://www.youtube.com/watch?v=4f_mIRrns2U'}

interface IEvent {
  title: string;
  start: string;
  end: string;
}
function addEvent(eventArr: IEvent) {
  eventsL.push(eventArr)
}
addEvent(pppppp)

function FullCalendarApp() {
  const[iEvent, setEvent] = useState<IEvent[]>();

  useEffect(() => {
    let tmpEvent: IEvent[];
  }, []);

  return (
    <div className="App">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}

        //Ab hier findet Customization statt, um den Kalender an Bedürfnisse/Gewohnheiten anzupassen
        initialView="timeGridWeek"  //Wochendarstellung, die Tage werden als Spalten nebeneinander angezeigt
        headerToolbar={{  //Die Toolbar über dem eigentlichen Kalender enthält per Default Knöpfe und Funktionalitäten z.B. zum Umschalten auf Tages- oder Monatsansicht, oder zum Spulen der Wochen
          center: 'title', //Es das Anfangs- und Enddatum der aktuell dargestellten Woche angezeigt
          left: 'dayGridMonth timeGridWeek', //Buttons zum Umschalten von Monats- und Wochenansicht
          right: 'prev,today,next', //Die Buttons zum Navigieren der Wochen. Trennung durch Leerzeichen statt Komma trennt die Buttons visuell voneinander. Komma und Leerzeichen sorgen für eine whacke Darstellung
        }}
        firstDay= {1} //Der Montag ist der erste dargestellte Tag
        slotMinTime={'06:00:00'} //Die frühste Uhrzeit, die dargestellt wird
        slotMaxTime={'22:00:00'} //Die späteste Uhrzeit, die dargestellt wird
        slotDuration={'00:30:00'} //Die Zeitspanne, die ein Slot beinhaltet, kleinere Slots bedeuten, dass der gesamte Kalender länger wird
        hiddenDays = {[0]} //Der Sonntag wird versteckt
        eventColor="#a01b1b"  //Farbe der Event-Felder
        eventTextColor='black' //Farbe der Schrift in den Eventfeldern
        nowIndicator    //Ein roter Strich, welcher die aktuelle Uhrzeit anzeigt, wird im Kalender dargestellt
        locale={'de'}   //Setzt die Sprache z.B. beim Ausschreiben der Monate und Wochentage auf Deutsch
        allDaySlot = {false}  //Entfernt den Slot für ganztägige Events
        height={1000} //Die maximale Höhe des Kalenders. Bei Überschreitung werden Scrollbars eingesetzt 

        eventTimeFormat={{  //Format der Zeitdarstellung in den Eventblöcken
          hour: "numeric",    //Darstellen der Stunden in der numerischen Form, also ohne führende Nullen bei einer einstelligen Zahl
          minute: '2-digit', //Darstellen der Minuten immer mit zwei Zahlen
          hour12: false   //Die Stunden werden im 1-24 Format angezeigt, und nicht im 1-12 Format, wie per default
          }}

        
        //Hier werden die Events deklariert, die dann im Kalender dargestellt werden. Sinvollerweise sollte dies später durch automatische Prozesse erledigt werden
      
       /**  events={[{
         // id: '1',    //Event-ID. Zum Berarbeiten der Events bestimmt hilfreich, aber hier eigentlich unnötig
          title: "Kryptologie Raum 161C",  //Titel der Vorlesung, wird im Eventfeld angezeigt
          start: '20230601T100000', //Anfangsdatum und Zeit des Events
          end: '20230601T120000',     //Enddatum und Zeit des Events
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', //Diese Zeile macht überhaupt gar nichts und sollte in keinem Fall beachtet werden, weil sie wirklich gar nichts macht
        },
        {
          //id: '2',
          title: 'Mathematik Raum 161C',
          start: '20230602T131500',
          end: '20230602T180000',
        },
        { id: '3',  title: 'BWL Raum 161C', start: '20230530T170000', end: '20230-30T190000', url:'https://www.youtube.com/watch?v=4f_mIRrns2U' },
        ]} */
        events = {iEvent}

      />
    </div>
  );
}


export default FullCalendarApp;

function parseAllEvents() {

}

//Additional Intended Features:
//Creation of Custom Events
//Custom Buttons, for Example to visit the page hosting the DHBW-Calendar
//Automatic addition or removal of events according to the .ics file
//Popup with additional information, perhaps even custom notes
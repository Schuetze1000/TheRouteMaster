import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import deLocale from '@fullcalendar/core/locales/de';

const events = [
  {
    id: 1,
    title: 'event 1',
    start: '2021-06-14T10:00:00',
    end: '2021-06-14T12:00:00',
  },
  {
    id: 2,
    title: 'event 2',
    start: '2021-06-16T13:00:00',
    end: '2021-06-16T18:00:00',
  },
  { id: 3, title: 'event 3', start: '2021-06-17', end: '2021-06-20' },
];


function FullCalendarApp() {
  return (
    <div className="App">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}


        //Ab hier findet Customization statt, um den Kalender an Bedürfnisse/Gewohnheiten anzupassen
        initialView="timeGridWeek"  //Wochendarstellung, die Tage werden als Spalten nebeneinander angezeigt
        headerToolbar={{  //Die Toolbar über dem eigentlichen Kalender enthält per Default Knöpfe und Funktionalitäten z.B. zum Umschalten auf Tages- oder Monatsansicht, oder zum Spulen der Wochen
          center: 'title', //Es das Anfangs- und Enddatum der aktuell dargestellten Woche angezeigt
          left: '', //Hier würde per default der titel stehen
          right: '', //Hier wären per default buttons zum Navigieren zur nächsten, vorherigen oder aktuellen Woche
        }}
        firstDay= {1} //Der Montag ist der erste dargestellte Tag
        slotMinTime={'06:00:00'} //Die frühste Uhrzeit, die dargestellt wird
        slotMaxTime={'22:00:00'} //Die späteste Uhrzeit, die dargestellt wird
        slotDuration={'00:15:00'} //Die Länge eines Slots
        hiddenDays = {'0'} //Der Sonntag wird versteckt
        eventColor="#a01b1b"  //Farbe der Event-Felder
        eventTextColor='black' //Farbe der Schrift in den Eventfeldern
        nowIndicator    //Ein roter Strich, welcher die aktuelle Uhrzeit anzeigt, wird im Kalender dargestellt
        locale={'de'}   //Setzt die Sprache z.B. beim Ausschreiben der Monate und Wochentage auf Deutsch
        allDaySlot = {false}  //Entfernt den Slot für ganztägige Events

        eventTimeFormat={{  //Format der Zeitdarstellung in den Eventblöcken
          hour: "numeric",    //Darstellen der Stunden in der numerischen Form, also ohne führende Nullen bei einer einstelligen Zahl
          minute: '2-digit', //Darstellen der Minuten immer mit zwei Zahlen
          hour12: false   //Die Stunden werden im 1-24 Format angezeigt, und nicht im 1-12 Format, wie per default
          }}


        //Hier werden die Events deklariert, die dann im Kalender dargestellt werden. Sinvollerweise sollte dies später durch automatische Prozesse erledigt werden
        events={[{
          id: 1,    //Event-ID. Zum Berarbeiten der Events bestimmt hilfreich, aber hier eigentlich unnötig
          title: "Krypto Raum161C",  //Titel der Vorlesung, wird im Eventfeld angezeigt
          start: '2023-06-01T10:00:00', //Anfangsdatum und Zeit des Events
          end: '2023-06-01T12:00:00',     //Enddatum und Zeit des Events
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', //Diese Zeile macht überhaupt gar nichts und sollte in keinem Fall beachtet werden, weil sie wirklich gar nichts macht
          extendedProps: 'RADASDASD'
        },
        {
          id: 2,
          title: 'Mathe',
          start: '2023-06-02T13:00:00',
          end: '2023-06-02T18:00:00',
        },
        { id: 3, title: 'BWL', start: '2023-05-30T17:00:00', end: '2023-05-30T19:00:00', url:'https://www.youtube.com/watch?v=4f_mIRrns2U' },
        ]}


      />
    </div>
  );
}

export default FullCalendarApp;
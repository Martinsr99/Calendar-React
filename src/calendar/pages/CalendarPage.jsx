import { Navbar } from "./components/Navbar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar } from "react-big-calendar";
import { addHours } from "date-fns";
import { getMessagesES, localizer } from "../../helpers";
import { CalendarEvent } from "./components/CalendarEvent";
import { useState } from "react";

const events = [
  {
    title: "Cumpleaños del jefe",
    ntoes: "Hay que comprar el pastel",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#fafafa",
    user: {
      id: "123",
      name: "Martin",
    },
  },
];

export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem("lastView") || 'week')

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };
    return {
      style,
    };
  };

  const onDoubleClick = (event) => {

  }

  const onSelect = (event) => {

  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView',event)
    setLastView()
  }

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 110px", width: '100%'}}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      )
    </>
  );
};

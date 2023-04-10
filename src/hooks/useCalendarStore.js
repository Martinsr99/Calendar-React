import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {

    try {
        
        if (calendarEvent.id) {
          if(calendarEvent.user._id !== user.uid) {
            Swal.fire('Privilegios insuficientes','Usted no es el creador de este evento','error')
            return
          }

          calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
    
          dispatch(onUpdateEvent({ ...calendarEvent, user }));
          return;
        }
        // Creando
        const { data } = await calendarApi.post("/events", calendarEvent);
    
        dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
    
    } catch (error) {
        Swal.fire('Error al guardar', error.response.data.msg,'error')
    }
    // Todo bien
  };

  const startDeletingEvent = async() => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
      return
    } catch (error) {
      Swal.fire('Error al eliminar', error.response.data.msg,'error')
    }

  };

  const startLoadingEvents = async() => {
    try {
        
        const { data } = await calendarApi.get('/events');
        const events = convertEventsToDateEvents( data.eventos );
        dispatch( onLoadEvents( events ) );


    } catch (error) {
      Swal.fire('Error al cargar', 'No se encontraron eventos', 'error')
    }
}

  return {
    //* Propiedades
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,

    //* Métodos
    startLoadingEvents,
    startDeletingEvent,
    setActiveEvent,
    startSavingEvent,
  };
};

import { Calendar, Component, createElement, DayHeaderContentArg } from '@fullcalendar/core';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { ScheduledEvent } from './ScheduledEvent';

document.addEventListener('DOMContentLoaded', function () {
  let calendarEl: HTMLElement = document.getElementById('calendar')!;

  let containerEl: HTMLElement = document.getElementById('external-events')!;

  let draggable = new Draggable(containerEl, {
    itemSelector: '.fc-event',
    eventData: function (eventEl: HTMLElement) {
      return {
        title: eventEl.innerText
      };
    }
  });

  let calendar: Calendar = new Calendar(calendarEl, {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    dayMaxEvents: true, // allow "more" link when too many events
    droppable: true, // this allows things to be dropped onto the calendar
    drop: function (info: any) {
      info.draggedEl.parentNode.removeChild(info.draggedEl);
      let event = new ScheduledEvent(info.draggedEl.innerText); // TODO: Causes ERROR.
      event.id = info.draggedEl.id;
      event.endDate = info.date;
    },
    eventDragStop(info: any) {
      console.log(info);
    }
  });

  fetch("http://localhost:3000/scheduledEvents", { method: 'GET' })
    .then(response => response.json())
    .then(data => {
      data.forEach((event: ScheduledEvent) => {
        if (event.endDate) {
          console.log(event);
          if ((new Date(event.endDate).getTime() - new Date(event.startDate!).getTime()) / 60000 <= event.minuteDuration!) {
            calendar.addEvent({
              title: event.title,
              start: event.startDate!,
              end: event.endDate,
              id: event.id!.toString()
            });
          } else {
            calendar.addEvent({
              title: event.title,
              start: event.startDate!,
              id: event.id!.toString()
            });
          }
        } else {
          // add event to draggable
          let drag = document.createElement('div');
          drag.classList.add('fc-event');
          drag.innerText = event.title;
          drag.id = event.id!.toString();
          containerEl.appendChild(drag);
        }
      })
    });


  calendar.render();
});
import { Calendar, Component, createElement, DayHeaderContentArg } from '@fullcalendar/core';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { ScheduledEvent } from './ScheduledEvent';
import { ScheduledEventStore } from './ScheduledEventStore';

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

  let scheduledEventStore = new ScheduledEventStore();

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
      scheduledEventStore.setEndDate(+info.draggedEl.id, info.date);
    },
    eventDrop(eventDropInfo: any) {
      scheduledEventStore.update(eventDropInfo.event);
    },
    eventResize(eventResizeInfo: any) {
      scheduledEventStore.update(eventResizeInfo.event);
    }
  });

  scheduledEventStore.init().then(() => {
    Array.from(scheduledEventStore.events.values()).forEach((event: ScheduledEvent) => {
      if (event.endDate) {
        if (event.startDate) {
          if (event.isDurationLocked()) {
            calendar.addEvent({
              title: event.title,
              start: event.startDate!,
              end: event.endDate,
              id: event.id!.toString()
            });
          } else {
            calendar.addEvent({
              title: event.title,
              start: event.endDate!,
              id: event.id!.toString()
            });
          }
        } else {
          calendar.addEvent({
            title: event.title,
            start: event.endDate,
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
    });
});


  calendar.render();
});
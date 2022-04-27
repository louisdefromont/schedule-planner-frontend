import { Calendar } from '@fullcalendar/core';

document.addEventListener('DOMContentLoaded', function() {
	var calendarEl: HTMLElement = document.getElementById('calendar')!;
	var calendar = new Calendar(calendarEl, {
	  initialView: 'dayGridMonth'
	});
	calendar.render();
  });
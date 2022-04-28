import { ScheduledEvent } from "./ScheduledEvent";

export class ScheduledEventStore {
	events = new Map<number, ScheduledEvent>();

	async init() {
		await this.get();
	}

	private async get(id?: number) {
		if (id) {
			return fetch("http://100.64.12.206:3000/scheduledEvents/" + id, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}).then((response) => {
				return response.json();
			}).then((event: ScheduledEvent) => {
				this.events.set(event.id!, event);
			});
		} else {
			return fetch("http://100.64.12.206:3000/scheduledEvents/", { method: 'GET' })
			.then(response => response.json())
			.then(data => {
				data.forEach((event: ScheduledEvent) => {
					this.events.set(event.id!, event);
				});
			});
		}
	}

	private async post(event: ScheduledEvent) {
		return fetch("http://100.64.12.206:3000/scheduledEvents", {
			method: 'POST',
			body: JSON.stringify(event),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	private async put(event: ScheduledEvent) {
		return fetch("http://100.64.12.206:3000/scheduledEvents", {
			method: 'PUT',
			body: JSON.stringify(event),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	setEndDate(id: number, endDate: Date) {
		let event = this.events.get(id);
		if (event) {
			event.endDate = endDate;
			this.put(event);
		}
	}

	update(calendarEvent: any) {
		let event: ScheduledEvent = this.events.get(+calendarEvent.id)!;
		if (event) {
			if (calendarEvent.end) {
				event.startDate = calendarEvent.start;
				event.endDate = calendarEvent.end;
			} else {
				event.startDate = null;
				event.endDate = calendarEvent.start;
			}
			event.title = calendarEvent.title;
			this.put(event);
		}
	}
}
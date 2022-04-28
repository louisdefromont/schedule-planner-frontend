export class ScheduledEvent {
	id: number | null = null;
	startDate: Date | null = null;
	endDate: Date | null = null;
	title: string;
	description: string | null = null;
	minuteDuration: number | null = null;
	repeatInterval: number | null = null;

	constructor(title: string) {
		this.title = title;
	}
};
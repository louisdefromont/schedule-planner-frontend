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

	public isDurationLocked(): boolean {
		if (this.minuteDuration) {
			return ((this.endDate!.getTime() - this.startDate!.getTime()) / 60000 <= this.minuteDuration!);
		}
		return false;
	}
};
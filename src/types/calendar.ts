export interface CalendarEvent {
  start: Date;
  end: Date;
  source: 'airbnb' | 'private';
  status: 'booked' | 'blocked' | 'open';
  label?: string;
}

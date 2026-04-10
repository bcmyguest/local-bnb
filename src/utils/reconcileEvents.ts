import { CalendarEvent } from '@/types/calendar';

export interface ReconciledEvent extends CalendarEvent {
  source: 'airbnb' | 'private';
  hasOverlap: boolean;
}

export function reconcileEvents(
  airbnbEvents: CalendarEvent[],
  privateEvents: CalendarEvent[]
): ReconciledEvent[] {
  const allEvents: ReconciledEvent[] = [
    ...airbnbEvents.map(e => ({ ...e, source: 'airbnb' as const, hasOverlap: false })),
    ...privateEvents.map(e => ({ ...e, source: 'private' as const, hasOverlap: false }))
  ];

  // Sort events by start date to make overlap detection easier
  const sortedEvents = allEvents.sort((a, b) => a.start.getTime() - b.start.getTime());

  // Detect overlaps
  for (let i = 0; i < sortedEvents.length; i++) {
    for (let j = i + 1; j < sortedEvents.length; j++) {
      const eventA = sortedEvents[i];
      const eventB = sortedEvents[j];

      // Check if eventB starts before eventA ends
      if (eventB.start < eventA.end && eventB.end > eventA.start) {
        eventA.hasOverlap = true;
        eventB.hasOverlap = true;
      }
    }
  }

  return sortedEvents;
}

import { useState, useEffect } from 'react'
import ICAL from 'ical.js'
import { CalendarEvent } from '@/types/calendar'

export function useCalendarEvents(icsUrl: string) {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchAndParse() {
      try {
        const response = await fetch(icsUrl)
        if (!response.ok) throw new Error(`Failed to fetch calendar: ${response.status}`)
        const text = await response.text()

        const jcalData = ICAL.parse(text)
        const comp = new ICAL.Component(jcalData)
        const vevents = comp.getAllSubcomponents('vevent')

        const parsedEvents: CalendarEvent[] = vevents.map(event => {
          const icalEvent = new ICAL.Event(event)
          return {
            start: icalEvent.startDate.toJSDate(),
            end: icalEvent.endDate.toJSDate(),
            source: 'airbnb' as const,
            status: 'booked' as const,
            label: icalEvent.summary || 'Airbnb Booking'
          }
        })

        if (!cancelled) {
          setEvents(parsedEvents)
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error')
          setLoading(false)
        }
      }
    }

    fetchAndParse()
    return () => { cancelled = true }
  }, [icsUrl])

  return { events, loading, error }
}

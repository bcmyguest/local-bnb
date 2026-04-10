import { useState, useEffect } from 'react'
import { CalendarEvent } from '@/types/calendar'
import ICAL from 'ical.js'

export function usePrivateEvents(icsUrl: string) {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchAndParse() {
      if (!icsUrl) {
        setLoading(false)
        return
      }
      try {
        const response = await fetch(icsUrl)
        if (!response.ok) throw new Error(`Failed to fetch private events: ${response.status}`)
        const text = await response.text()

        const jcalData = ICAL.parse(text)
        const comp = new ICAL.Component(jcalData)
        const vevents = comp.getAllSubcomponents('vevent')

        const parsedEvents: CalendarEvent[] = vevents.map(event => {
          const icalEvent = new ICAL.Event(event)
          return {
            start: icalEvent.startDate.toJSDate(),
            end: icalEvent.endDate.toJSDate(),
            source: 'private' as const,
            status: 'blocked' as const,
            label: icalEvent.summary || 'Private Event'
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

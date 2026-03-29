import { useState, useEffect } from 'react'
import ICAL from 'ical.js'

export function useCalendarEvents(icsUrl: string) {
  const [bookedDates, setBookedDates] = useState<Set<string>>(new Set())
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
        const events = comp.getAllSubcomponents('vevent')

        const dates = new Set<string>()
        for (const event of events) {
          const icalEvent = new ICAL.Event(event)
          const start = icalEvent.startDate.toJSDate()
          const end = icalEvent.endDate.toJSDate()

          const current = new Date(start)
          while (current < end) {
            const yyyy = current.getFullYear()
            const mm = String(current.getMonth() + 1).padStart(2, '0')
            const dd = String(current.getDate()).padStart(2, '0')
            dates.add(`${yyyy}-${mm}-${dd}`)
            current.setDate(current.getDate() + 1)
          }
        }

        if (!cancelled) {
          setBookedDates(dates)
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

  return { bookedDates, loading, error }
}

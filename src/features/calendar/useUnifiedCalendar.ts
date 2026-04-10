import { useMemo } from 'react'
import { useCalendarEvent } from './useCalendarEvent'
import { usePrivateEvents } from './usePrivateEvents'
import { reconcileEvents } from '@/utils/reconcileEvents'

export function useUnifiedCalendar(airbnbIcsUrl: string, privateIcsUrl?: string) {
  const { events: airbnbEvents, loading: airbnbLoading, error: airbnbError } = useCalendarEvent(airbnbIcsUrl)
  const { events: privateEvents, loading: privateLoading, error: privateError } = usePrivateEvents(privateIcsUrl || '')

  const loading = airbnbLoading || privateLoading
  const error = airbnbError || privateError

  const events = useMemo(() => {
    if (loading) return []
    try {
      return reconcileEvents(airbnbEvents, privateEvents)
    } catch {
      return []
    }
  }, [airbnbEvents, privateEvents, loading])

  return { events, loading, error }
}

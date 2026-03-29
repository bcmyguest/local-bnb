import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import AvailabilityCalendar from './AvailabilityCalendar'

const MOCK_ICS = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Test//Test//EN
BEGIN:VEVENT
DTSTART;VALUE=DATE:20260401
DTEND;VALUE=DATE:20260403
SUMMARY:Booked
END:VEVENT
END:VCALENDAR`

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('AvailabilityCalendar', () => {
  it('renders the section title', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(MOCK_ICS, { status: 200 })
    )
    render(<AvailabilityCalendar />)
    expect(screen.getByText('Availability')).toBeInTheDocument()
  })

  it('shows a loading spinner while fetching', () => {
    vi.spyOn(globalThis, 'fetch').mockReturnValue(new Promise(() => {}))
    render(<AvailabilityCalendar />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('shows an error when fetch fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'))
    render(<AvailabilityCalendar />)

    await waitFor(() => {
      expect(screen.getByText(/Could not load availability/)).toBeInTheDocument()
    })
  })

  it('renders calendars after loading', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(MOCK_ICS, { status: 200 })
    )
    render(<AvailabilityCalendar />)

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    })

    // Should render 3 months of calendar
    const calendarGrids = screen.getAllByRole('grid')
    expect(calendarGrids.length).toBe(3)
  })

  it('renders the explanatory text', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(MOCK_ICS, { status: 200 })
    )
    render(<AvailabilityCalendar />)
    expect(
      screen.getByText(/Dates shown with a strikethrough/)
    ).toBeInTheDocument()
  })
})

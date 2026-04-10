import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import dayjs, { Dayjs } from 'dayjs'
import SectionTitle from '@/components/UI/SectionTitle'
import { useUnifiedCalendar } from './useUnifiedCalendar'
import { property } from '@/features/property/property.data'

interface BookedDayProps extends PickersDayProps<Dayjs> {
  airbnbDates: Set<string>
  privateDates: Set<string>
}

const BookedDay = (props: BookedDayProps) => {
  const { airbnbDates, privateDates, day, ...other } = props
  const dateStr = day.format('YYYY-MM-DD')
  const isAirbnb = airbnbDates.has(dateStr)
  const isPrivate = privateDates.has(dateStr)

  return (
    <PickersDay
      {...other}
      day={day}
      disabled={isAirbnb || isPrivate}
      sx={{
        ...(isAirbnb && {
          bgcolor: '#f0c0c0',
          color: '#8b0000',
          textDecoration: 'line-through',
        }),
        ...(isPrivate && {
          bgcolor: '#c0d0f0',
          color: '#00008b',
        }),
      }}
    />
  )
}

export default function AvailabilityCalendar() {
  const { events, loading, error } = useUnifiedCalendar(
    property.icsUrl,
    property.privateIcsUrl
  )
  const [startMonth, setStartMonth] = useState(dayjs().startOf('month'))

  const airbnbDates = new Set<string>()
  const privateDates = new Set<string>()

  events.forEach((event) => {
    const start = dayjs(event.start)
    const end = dayjs(event.end)
    let current = start
    while (current.isBefore(end)) {
      const dStr = current.format('YYYY-MM-DD')
      if (event.source === 'airbnb') {
        airbnbDates.add(dStr)
      } else {
        privateDates.add(dStr)
      }
      current = current.add(1, 'day')
    }
  })

  const goBack = () => setStartMonth((m: Dayjs) => m.subtract(1, 'month'))
  const goForward = () => setStartMonth((m: Dayjs) => m.add(1, 'month'))

  return (
    <Box sx={{ mt: 1 }}>
      <SectionTitle id="availability">Availability</SectionTitle>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
        Dates shown with a strikethrough are already booked. Contact us to reserve your stay.
      </Typography>
      <Box sx={{ mb: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 16, height: 16, bgcolor: '#f0c0c0', borderRadius: '50%' }} />
          <Typography variant="caption">Airbnb</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 16, height: 16, bgcolor: '#c0d0f0', borderRadius: '50%' }} />
          <Typography variant="caption">Private</Typography>
        </Box>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error">
          Could not load availability: {error}
        </Typography>
      )}

      {!loading && !error && (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <IconButton onClick={goBack} aria-label="Previous months">
              <ChevronLeftIcon />
            </IconButton>
            <Typography variant="h6" sx={{ minWidth: 200, textAlign: 'center' }}>
              {startMonth.format('MMMM YYYY')} &ndash;{' '}
              {startMonth.add(2, 'month').format('MMMM YYYY')}
            </Typography>
            <IconButton onClick={goForward} aria-label="Next months">
              <ChevronRightIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {[0, 1, 2].map((offset) => {
              const month = startMonth.add(offset, 'month')
              return (
                <Box key={month.format('YYYY-MM')}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                      readOnly
                      value={null}
                      referenceDate={month}
                      slots={{
                        day: BookedDay,
                        leftArrowIcon: () => null,
                        rightArrowIcon: () => null,
                      }}
                      slotProps={{
                        day: { airbnbDates, privateDates },
                      }}
                    />
                  </LocalizationProvider>
                </Box>
              )
            })}
          </Box>
        </Box>
      )}
    </Box>
  )
}

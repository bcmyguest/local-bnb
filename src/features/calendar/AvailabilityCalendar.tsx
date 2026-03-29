import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import dayjs, { Dayjs } from 'dayjs'
import SectionTitle from '@/components/UI/SectionTitle'
import { useCalendarEvents } from './useCalendarEvents'
import { property } from '@/features/property/property.data'

function BookedDay(props: PickersDayProps<Dayjs> & { bookedDates: Set<string> }) {
  const { bookedDates, day, ...other } = props
  const dateStr = day.format('YYYY-MM-DD')
  const isBooked = bookedDates.has(dateStr)

  return (
    <PickersDay
      {...other}
      day={day}
      disabled={isBooked}
      sx={{
        ...(isBooked && {
          bgcolor: '#f0c0c0',
          color: '#8b0000',
          textDecoration: 'line-through',
          '&.Mui-disabled': {
            color: '#8b0000',
          },
        }),
      }}
    />
  )
}

export default function AvailabilityCalendar() {
  const { bookedDates, loading, error } = useCalendarEvents(property.icsUrl)

  return (
    <Box>
      <SectionTitle id="availability">Availability</SectionTitle>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Dates shown with a strikethrough are already booked. Contact us to
        reserve your stay.
      </Typography>

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
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {[0, 1, 2].map((offset) => (
            <Box key={offset}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  readOnly
                  defaultValue={dayjs().add(offset, 'month')}
                  referenceDate={dayjs().add(offset, 'month')}
                  slots={{ day: BookedDay }}
                  slotProps={{ day: { bookedDates } as never }}
                />
              </LocalizationProvider>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

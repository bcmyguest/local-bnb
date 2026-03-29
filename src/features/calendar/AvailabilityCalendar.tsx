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
  const [startMonth, setStartMonth] = useState(dayjs().startOf('month'))

  const goBack = () => setStartMonth((m) => m.subtract(1, 'month'))
  const goForward = () => setStartMonth((m) => m.add(1, 'month'))

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
                      value={month}
                      referenceDate={month}
                      slots={{
                        day: BookedDay,
                        leftArrowIcon: () => null,
                        rightArrowIcon: () => null,
                      }}
                      slotProps={{
                        day: { bookedDates } as never,
                        calendarHeader: {
                          sx: {
                            pointerEvents: 'none',
                            '& .MuiPickersCalendarHeader-switchViewButton': {
                              display: 'none',
                            },
                          },
                        },
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

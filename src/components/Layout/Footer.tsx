import { property } from '@/features/property/property.data'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        mt: 8,
        textAlign: 'center',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} {property.name}. All rights
        reserved.
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        Booking by phone only &mdash; no online reservations.
      </Typography>
    </Box>
  )
}

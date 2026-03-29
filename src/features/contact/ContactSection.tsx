import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import InfoIcon from '@mui/icons-material/Info'
import SectionTitle from '@/components/UI/SectionTitle'
import { property } from '@/features/property/property.data'

export default function ContactSection() {
  return (
    <Box sx={{mt: 1}}>
      <SectionTitle id="contact">Contact</SectionTitle>
      <Paper variant="outlined" sx={{ p: 3, maxWidth: 500 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <PhoneIcon color="primary" />
          <Typography variant="body1">
            <strong>Phone:</strong> {property.contact.phone}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <EmailIcon color="primary" />
          <Typography variant="body1">
            <strong>Email:</strong> {property.contact.email}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <InfoIcon color="secondary" />
          <Typography variant="body2" color="text.secondary">
            Booking is by phone only &mdash; no online reservations.
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}

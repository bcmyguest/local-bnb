import Container from '@mui/material/Container'
import ImageGallery from '@/features/imageGallery/ImageGallery'
import PropertyDetails from '@/features/property/PropertyDetails'
import AvailabilityCalendar from '@/features/calendar/AvailabilityCalendar'
import LocationMap from '@/features/location/LocationMap'
import ContactSection from '@/features/contact/ContactSection'

export default function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <ImageGallery />
      <PropertyDetails />
      <LocationMap />
      <AvailabilityCalendar />
      <ContactSection />
    </Container>
  )
}

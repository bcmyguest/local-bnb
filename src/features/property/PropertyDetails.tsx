import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import WifiIcon from '@mui/icons-material/Wifi'
import LocalParkingIcon from '@mui/icons-material/LocalParking'
import KitchenIcon from '@mui/icons-material/Kitchen'
import FireplaceIcon from '@mui/icons-material/Fireplace'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService'
import PetsIcon from '@mui/icons-material/Pets'
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill'
import KayakingIcon from '@mui/icons-material/Kayaking'
import CasinoIcon from '@mui/icons-material/Casino'
import SectionTitle from '@/components/UI/SectionTitle'
import { property } from './property.data'

const amenityIcons: Record<string, React.ReactElement> = {
  'WiFi': <WifiIcon />,
  'Free Parking': <LocalParkingIcon />,
  'Kitchen': <KitchenIcon />,
  'Fireplace': <FireplaceIcon />,
  'Air Conditioning': <AcUnitIcon />,
  'Washer & Dryer': <LocalLaundryServiceIcon />,
  'Pet Friendly': <PetsIcon />,
  'BBQ Grill': <OutdoorGrillIcon />,
  'Lake Access': <KayakingIcon />,
  'Board Games': <CasinoIcon />,
}

export default function PropertyDetails() {
  return (
    <Box sx={{mt: 1}}>
      <SectionTitle id="about">About</SectionTitle>
      <Typography variant="h4" gutterBottom color="text.primary">
        {property.tagline}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 800 }}>
        {property.description}
      </Typography>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Amenities
      </Typography>
      <Grid container spacing={1.5}>
        {property.amenities.map((amenity) => (
          <Grid key={amenity}>
            <Chip
              icon={amenityIcons[amenity]}
              label={amenity}
              variant="outlined"
              sx={{ px: 1, py: 2.5 }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

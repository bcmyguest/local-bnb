import { useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import SectionTitle from '@/components/UI/SectionTitle'
import { photos } from './gallery.data'

export default function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1))
  }

  const thumbnailIndices = photos
    .map((_, i) => i)
    .filter((i) => i !== currentIndex)
    .slice(0, 3)

  return (
    <Box>
      <SectionTitle id="photos">Photos</SectionTitle>
      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ position: 'relative', flex: 2, minHeight: 400 }}>
          <Box
            component="img"
            src={photos[currentIndex].src}
            alt={photos[currentIndex].alt}
            sx={{
              width: '100%',
              height: '100%',
              minHeight: 400,
              objectFit: 'cover',
              borderRadius: 2,
              display: 'block',
            }}
          />
          <IconButton
            onClick={goToPrevious}
            aria-label="Previous photo"
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255,255,255,0.85)',
              '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            onClick={goToNext}
            aria-label="Next photo"
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255,255,255,0.85)',
              '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {thumbnailIndices.map((i) => (
            <Box
              key={i}
              component="img"
              src={photos[i].src}
              alt={photos[i].alt}
              onClick={() => setCurrentIndex(i)}
              sx={{
                width: '100%',
                height: 0,
                paddingBottom: '56%',
                objectFit: 'cover',
                borderRadius: 1,
                cursor: 'pointer',
                opacity: 0.8,
                transition: 'opacity 0.2s',
                '&:hover': { opacity: 1 },
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

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

  const thumbnailCount = Math.min(3, photos.length - 1)
  const thumbnailIndices = Array.from(
    { length: thumbnailCount },
    (_, i) => (currentIndex + 1 + i) % photos.length
  )

  return (
    <Box>
      <SectionTitle id="photos">Photos</SectionTitle>
      <Box
        sx={{
          display: { xs: 'block', md: 'grid' },
          gridTemplateColumns: { md: '3fr 1fr' },
          gridTemplateRows: { md: 'repeat(3, 1fr)' },
          gap: 1,
          height: { xs: 500, md: 750 },
        }}
      >
        <Box sx={{ position: 'relative', gridRow: { md: '1 / -1' }, overflow: 'hidden', borderRadius: 2, height: { xs: '100%' } }}>
          <Box
            component="img"
            src={photos[currentIndex].src}
            alt={photos[currentIndex].alt}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
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
        {thumbnailIndices.map((i) => (
          <Box
            key={i}
            component="img"
            src={photos[i].src}
            alt={photos[i].alt}
            onClick={() => setCurrentIndex(i)}
            sx={{
              display: { xs: 'none', md: 'block' },
              width: '100%',
              height: '100%',
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
  )
}

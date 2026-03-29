import { useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import SectionTitle from '@/components/UI/SectionTitle'
import { property } from '@/features/property/property.data'
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { fromLonLat } from 'ol/proj'
import { Style, Icon } from 'ol/style'

export default function LocationMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const coords = fromLonLat(property.coordinates)

    const pinFeature = new Feature({
      geometry: new Point(coords),
    })

    pinFeature.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'data:image/svg+xml,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="48" viewBox="0 0 32 48">
              <path d="M16 0C7.16 0 0 7.16 0 16c0 12 16 32 16 32s16-20 16-32C32 7.16 24.84 0 16 0z" fill="#5C6B4F"/>
              <circle cx="16" cy="16" r="8" fill="white"/>
            </svg>
          `),
          scale: 1,
        }),
      })
    )

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        new VectorLayer({
          source: new VectorSource({ features: [pinFeature] }),
        }),
      ],
      view: new View({
        center: coords,
        zoom: 13,
      }),
    })

    mapInstanceRef.current = map

    return () => {
      map.setTarget(undefined)
      mapInstanceRef.current = null
    }
  }, [])

  const { street, city, province, postal } = property.address

  return (
    <Box>
      <SectionTitle id="location">Location</SectionTitle>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <LocationOnIcon color="primary" />
        <Typography variant="body1" color="text.secondary">
          {street}, {city}, {province} {postal}
        </Typography>
      </Box>
      <Box
        ref={mapRef}
        sx={{
          width: '100%',
          height: 400,
          borderRadius: 2,
          overflow: 'hidden',
          border: 1,
          borderColor: 'divider',
        }}
      />
    </Box>
  )
}

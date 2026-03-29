import { useState, useEffect } from 'react'

interface GeocodeResult {
  coordinates: [number, number] | null
  loading: boolean
  error: string | null
}

export function useGeocode(address: {
  street: string
  city: string
  province: string
  postal: string
}): GeocodeResult {
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function geocode() {
      try {
        const queries = [
          `${address.street}, ${address.city}, ${address.province} ${address.postal}`,
          `${address.street}, ${address.city}, ${address.province} ${address.postal}`,
        ]

        let data: { lon: string; lat: string }[] = []
        for (const query of queries) {
          const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`
          const response = await fetch(url, {
            headers: { 'User-Agent': 'LocalBnB/1.0' },
          })
          if (!response.ok) throw new Error(`Geocoding failed: ${response.status}`)
          data = await response.json()
          if (data.length > 0) break
        }
        if (data.length === 0) throw new Error('Address not found')

        if (!cancelled) {
          setCoordinates([parseFloat(data[0].lon), parseFloat(data[0].lat)])
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Geocoding failed')
          setLoading(false)
        }
      }
    }

    geocode()
    return () => { cancelled = true }
  }, [address.street, address.city, address.province, address.postal])

  return { coordinates, loading, error }
}

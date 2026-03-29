import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PropertyDetails from './PropertyDetails'
import { property } from './property.data'

describe('PropertyDetails', () => {
  it('renders the section title', () => {
    render(<PropertyDetails />)
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders the property tagline', () => {
    render(<PropertyDetails />)
    expect(screen.getByText(property.tagline)).toBeInTheDocument()
  })

  it('renders the property description', () => {
    render(<PropertyDetails />)
    expect(screen.getByText(property.description)).toBeInTheDocument()
  })

  it('renders the amenities heading', () => {
    render(<PropertyDetails />)
    expect(screen.getByText('Amenities')).toBeInTheDocument()
  })

  it('renders all amenities', () => {
    render(<PropertyDetails />)
    for (const amenity of property.amenities) {
      expect(screen.getByText(amenity)).toBeInTheDocument()
    }
  })
})

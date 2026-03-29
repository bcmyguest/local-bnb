import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ContactSection from './ContactSection'
import { property } from '@/features/property/property.data'

describe('ContactSection', () => {
  it('renders the section title', () => {
    render(<ContactSection />)
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders the phone number', () => {
    render(<ContactSection />)
    expect(screen.getByText(property.contact.phone)).toBeInTheDocument()
  })

  it('renders the email', () => {
    render(<ContactSection />)
    expect(screen.getByText(property.contact.email)).toBeInTheDocument()
  })

  it('shows booking-by-phone notice', () => {
    render(<ContactSection />)
    expect(
      screen.getByText(/Booking is by phone only/)
    ).toBeInTheDocument()
  })
})

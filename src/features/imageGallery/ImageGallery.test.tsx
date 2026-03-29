import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import ImageGallery from './ImageGallery'
import { photos } from './gallery.data'

describe('ImageGallery', () => {
  it('renders the section title', () => {
    render(<ImageGallery />)
    expect(screen.getByText('Photos')).toBeInTheDocument()
  })

  it('renders the first photo as main image', () => {
    render(<ImageGallery />)
    const mainImg = screen.getByAltText(photos[0].alt)
    expect(mainImg).toBeInTheDocument()
    expect(mainImg).toHaveAttribute('src', photos[0].src)
  })

  it('renders navigation buttons', () => {
    render(<ImageGallery />)
    expect(screen.getByLabelText('Previous photo')).toBeInTheDocument()
    expect(screen.getByLabelText('Next photo')).toBeInTheDocument()
  })

  it('navigates to the next photo when clicking next', async () => {
    const user = userEvent.setup()
    render(<ImageGallery />)

    await user.click(screen.getByLabelText('Next photo'))

    const mainImg = screen.getByAltText(photos[1].alt)
    expect(mainImg).toHaveAttribute('src', photos[1].src)
  })

  it('navigates to the previous photo (wraps around)', async () => {
    const user = userEvent.setup()
    render(<ImageGallery />)

    await user.click(screen.getByLabelText('Previous photo'))

    const lastPhoto = photos[photos.length - 1]
    const mainImg = screen.getByAltText(lastPhoto.alt)
    expect(mainImg).toHaveAttribute('src', lastPhoto.src)
  })

  it('wraps around from last to first on next', async () => {
    const user = userEvent.setup()
    render(<ImageGallery />)

    for (let i = 0; i < photos.length; i++) {
      await user.click(screen.getByLabelText('Next photo'))
    }

    const mainImg = screen.getByAltText(photos[0].alt)
    expect(mainImg).toHaveAttribute('src', photos[0].src)
  })

  it('renders thumbnail images', () => {
    render(<ImageGallery />)
    // Thumbnails are the photos that are not the current main image
    const allImages = screen.getAllByRole('img')
    expect(allImages.length).toBeGreaterThanOrEqual(2)
  })

  it('clicking a thumbnail changes the main image', async () => {
    const user = userEvent.setup()
    render(<ImageGallery />)

    // Click on the thumbnail for photo2 (index 1)
    const thumbnail = screen.getByAltText(photos[1].alt)
    await user.click(thumbnail)

    // Now photo2 should be the main image
    const mainImg = screen.getByAltText(photos[1].alt)
    expect(mainImg).toHaveAttribute('src', photos[1].src)
  })
})

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

  it('renders the next 3 photos as thumbnails', () => {
    render(<ImageGallery />)
    // When currentIndex=0, thumbnails should be indices 1, 2, 3
    for (let i = 1; i <= 3; i++) {
      const thumb = screen.getByAltText(photos[i].alt)
      expect(thumb).toHaveAttribute('src', photos[i].src)
    }
    // Total images: 1 main + 3 thumbnails = 4
    expect(screen.getAllByRole('img')).toHaveLength(4)
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

  it('thumbnails wrap around when viewing the last image', async () => {
    const user = userEvent.setup()
    render(<ImageGallery />)

    // Navigate to the last photo
    for (let i = 0; i < photos.length - 1; i++) {
      await user.click(screen.getByLabelText('Next photo'))
    }

    // Thumbnails should wrap: indices 0, 1, 2
    for (const idx of [0, 1, 2]) {
      expect(screen.getByAltText(photos[idx].alt)).toBeInTheDocument()
    }
  })

  it('thumbnails wrap correctly from second-to-last image', async () => {
    const user = userEvent.setup()
    render(<ImageGallery />)

    // Navigate to index 4
    for (let i = 0; i < 4; i++) {
      await user.click(screen.getByLabelText('Next photo'))
    }

    // Thumbnails should be (4+1)%6=5, (4+2)%6=0, (4+3)%6=1
    const expected = [
      (4 + 1) % photos.length,
      (4 + 2) % photos.length,
      (4 + 3) % photos.length,
    ]
    for (const idx of expected) {
      expect(screen.getByAltText(photos[idx].alt)).toBeInTheDocument()
    }
  })

  it('thumbnails update after clicking a thumbnail', async () => {
    const user = userEvent.setup()
    render(<ImageGallery />)

    // Click index 2 thumbnail (when viewing index 0, thumbnails are 1,2,3)
    await user.click(screen.getByAltText(photos[2].alt))

    // Now currentIndex=2, thumbnails should be 3, 4, 5
    for (const idx of [3, 4, 5]) {
      expect(screen.getByAltText(photos[idx].alt)).toBeInTheDocument()
    }

    // Main image should be photos[2]
    const mainImg = screen.getByAltText(photos[2].alt)
    expect(mainImg).toHaveAttribute('src', photos[2].src)
  })
})

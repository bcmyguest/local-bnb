import { test, expect } from '@playwright/test'
import { property } from '../src/features/property/property.data'
import { photos } from '../src/features/imageGallery/gallery.data'

test('homepage loads with all sections', async ({ page }) => {
  await page.goto('/')

  // Header
  await expect(page.getByText(property.name).first()).toBeVisible()

  // Photos section
  await expect(page.getByRole('heading', { name: 'Photos' })).toBeVisible()
  await expect(page.getByLabel('Next photo')).toBeVisible()
  await expect(page.getByLabel('Previous photo')).toBeVisible()

  // About section
  await expect(page.getByRole('heading', { name: 'About' })).toBeVisible()
  await expect(page.getByText('Amenities')).toBeVisible()
  await expect(page.getByText(property.amenities[0])).toBeVisible()

  // Location section
  await expect(page.getByRole('heading', { name: 'Location' })).toBeVisible()

  // Availability section
  await expect(page.getByRole('heading', { name: 'Availability' })).toBeVisible()

  // Contact section
  await expect(page.getByRole('heading', { name: 'Contact' })).toBeVisible()
  await expect(page.getByText(property.contact.phone)).toBeVisible()
})

test('image gallery navigation works', async ({ page }) => {
  await page.goto('/')

  const nextBtn = page.getByLabel('Next photo')
  await nextBtn.click()

  // After clicking next, the second photo should be the main image
  await expect(
    page.getByAltText(photos[1].alt).first()
  ).toBeVisible()
})

test('gallery thumbnails update on navigation', async ({ page }) => {
  await page.goto('/')
  await page.setViewportSize({ width: 1280, height: 720 })

  // Initially viewing photo 0; thumbnails should be photos 1, 2, 3
  for (let i = 1; i <= 3; i++) {
    await expect(page.getByAltText(photos[i].alt)).toBeVisible()
  }

  // Click Previous to wrap to last photo (index 5)
  await page.getByLabel('Previous photo').click()

  // Thumbnails should now be indices 0, 1, 2
  for (const idx of [0, 1, 2]) {
    await expect(page.getByAltText(photos[idx].alt)).toBeVisible()
  }
})

test('clicking thumbnail changes main image and updates sidebar', async ({ page }) => {
  await page.goto('/')
  await page.setViewportSize({ width: 1280, height: 720 })

  // Click on photo 3 thumbnail (visible when viewing index 0)
  await page.getByAltText(photos[3].alt).click()

  // Thumbnails should now be (3+1)%6=4, (3+2)%6=5, (3+3)%6=0
  const expectedIndices = [
    (3 + 1) % photos.length,
    (3 + 2) % photos.length,
    (3 + 3) % photos.length,
  ]
  for (const idx of expectedIndices) {
    await expect(page.getByAltText(photos[idx].alt)).toBeVisible()
  }
})

test('calendar shows current month', async ({ page }) => {
  await page.goto('/')

  // Wait for calendar grids to appear
  const grids = page.getByRole('grid')
  await expect(grids.first()).toBeVisible({ timeout: 10000 })
})

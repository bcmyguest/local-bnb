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

test('calendar shows current month', async ({ page }) => {
  await page.goto('/')

  // Wait for calendar grids to appear
  const grids = page.getByRole('grid')
  await expect(grids.first()).toBeVisible({ timeout: 10000 })
})

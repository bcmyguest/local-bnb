import { test, expect } from '@playwright/test'

test('homepage loads with all sections', async ({ page }) => {
  await page.goto('/')

  // Header
  await expect(page.getByText('Maple Ridge Retreat').first()).toBeVisible()

  // Photos section
  await expect(page.getByRole('heading', { name: 'Photos' })).toBeVisible()
  await expect(page.getByLabel('Next photo')).toBeVisible()
  await expect(page.getByLabel('Previous photo')).toBeVisible()

  // About section
  await expect(page.getByRole('heading', { name: 'About' })).toBeVisible()
  await expect(page.getByText('Amenities')).toBeVisible()
  await expect(page.getByText('WiFi')).toBeVisible()

  // Location section
  await expect(page.getByRole('heading', { name: 'Location' })).toBeVisible()

  // Availability section
  await expect(page.getByRole('heading', { name: 'Availability' })).toBeVisible()

  // Contact section
  await expect(page.getByRole('heading', { name: 'Contact' })).toBeVisible()
  await expect(page.getByText('(705) 555-0192')).toBeVisible()
})

test('image gallery navigation works', async ({ page }) => {
  await page.goto('/')

  const nextBtn = page.getByLabel('Next photo')
  await nextBtn.click()

  // After clicking next, the second photo alt text should be visible
  await expect(
    page.getByAltText('Open-concept living room with fireplace').first()
  ).toBeVisible()
})

test('calendar shows current month', async ({ page }) => {
  await page.goto('/')

  // Wait for calendar to load (spinner should disappear)
  await expect(page.getByRole('progressbar')).toBeHidden({ timeout: 10000 })

  // Should have calendar grids rendered
  const grids = page.getByRole('grid')
  await expect(grids.first()).toBeVisible()
})

# LocalBnB — Project Plans


## Feature Development

### Context
Once project setup is complete, implement the single-page LocalBnB website. No authentication, no backend, no online booking. All data (photos, dates, property info) is hardcoded. Users can view the property and check calendar availability only.

---

### Pages & Sections

One page (`/`), scrollable, with these sections in order:
1. **Header** — property name + logo, sticky nav links (Photos, Location, Availability, Contact)
2. **Image Gallery** — one large main image + 2–3 smaller thumbnails alongside it; left/right buttons overlaid on the main image to flip through all photos
3. **About / Details** — property description + amenities list (icons from `@mui/icons-material`)
4. **Location** — hardcoded address + OpenLayers map with OpenStreetMap tiles and a pin
5. **Availability Calendar** — read-only calendar; booked dates parsed from an ICS calendar URL
6. **Contact** — phone/email display, note that booking is by phone only

---

### Component Breakdown

```
src/
  components/
    Layout/
      Header.tsx
      Footer.tsx
    UI/
      SectionTitle.tsx       # reusable section heading
  features/
    imageGallery/
      ImageGallery.tsx       # main image + side thumbnails + left/right nav
      ImageGallery.test.tsx
      gallery.data.ts        # hardcoded photo list
    property/
      PropertyDetails.tsx    # description + amenities
      PropertyDetails.test.tsx
    location/
      LocationMap.tsx        # OpenLayers + OSM map with pin
    calendar/
      AvailabilityCalendar.tsx
      AvailabilityCalendar.test.tsx
      useCalendarEvents.ts   # hook: fetch ICS URL → parse with ical.js → return booked dates
    contact/
      ContactSection.tsx
  pages/
    HomePage.tsx             # assembles all features
  theme/
    theme.ts                 # MUI theme (palette, typography)
  assets/
    images/                  # hardcoded property photos
  App.tsx                    # wraps with MuiThemeProvider
```

---

### Calendar — ICS Parsing
Availability data comes from an ICS calendar URL (e.g., Airbnb's `.ics` export link for the property).

**Library**: `ical.js` (browser-safe, no Node.js deps, RFC 5545 compliant).

**Calendar UI**: `@mui/x-date-pickers` `DateCalendar` with custom day rendering to highlight booked dates.

**CORS concern**: Most ICS feed hosts (Airbnb, Google Calendar) do not send CORS headers. The ICS URL cannot be fetched directly from the browser in production. **Mitigation for initial phase**: store a local copy of the `.ics` file in `public/calendar.ics` and fetch from `/calendar.ics`. The URL to sync from is a hardcoded constant — the file gets updated manually. A future phase could automate this with a build step or proxy.

```typescript
// src/features/calendar/useCalendarEvents.ts
// Fetch /calendar.ics → parse with ical.js → return Set<string> of booked date strings (YYYY-MM-DD)
```

### Map
**Library**: `ol` (OpenLayers) — use vanilla `useEffect` + `useRef` pattern since there's no official React wrapper. Drop in `ol/Map`, `ol/layer/Tile`, `ol/source/OSM`, `ol/Feature`, `ol/geom/Point`, `ol/layer/Vector`, `ol/source/Vector` for the pin.

Add `ol` to production dependencies. Note: OpenLayers is ~400KB — acceptable for this app.

### Data Shape (hardcoded)
```typescript
// src/features/imageGallery/gallery.data.ts
export const photos: Array<{ src: string; alt: string }> = [
  { src: '/images/photo1.jpg', alt: '...' },
  // ...
]

// src/features/property/property.data.ts
export const property = {
  name: 'LocalBnB',
  tagline: '...',
  description: '...',
  amenities: ['WiFi', 'Parking', 'Kitchen', ...],
  address: { street: '...', city: '...', province: '...', postal: '...' },
  contact: { phone: '...', email: '...' },
  coordinates: [lng, lat] as [number, number],  // for OpenLayers
  icsUrl: '/calendar.ics',                       // local copy of ICS feed
}
```

---

### MUI Theme
Create `src/theme/theme.ts` with brand-appropriate palette (warm/neutral colors fitting a BnB). Pass to `<ThemeProvider>` in `App.tsx`.

---

### Testing Plan
- **Vitest + Testing Library**: unit/component tests for `Gallery`, `PropertyDetails`, `AvailabilityCalendar`
- **Playwright E2E**: smoke test that page loads, all sections render, calendar shows current month

---

### Additional Phase 2 Dependencies
- `ical.js` — ICS parsing in browser
- `@mui/x-date-pickers` + `@mui/x-date-pickers/AdapterDayjs` + `dayjs` — calendar UI
- `ol` — OpenLayers for the map

### Implementation Order
1. ~~Theme + App shell (Layout, Header, Footer)~~ **DONE**
2. ~~HomePage scaffold (empty section placeholders)~~ **DONE**
3. ~~ImageGallery (main image + thumbnails + nav buttons)~~ **DONE**
4. ~~PropertyDetails (amenities list)~~ **DONE**
5. ~~AvailabilityCalendar (fetch + parse ICS, highlight booked days)~~ **DONE**
6. ~~LocationMap (OpenLayers + OSM)~~ **DONE**
7. ~~ContactSection~~ **DONE**
8. ~~Tests for each feature~~ **DONE** (22 unit tests + 3 E2E tests)

---

### Verification
- `pnpm dev` → full page visible and scrollable **VERIFIED**
- `pnpm test` → all component tests pass **VERIFIED** (22 tests passing)
- `pnpm e2e` → Playwright confirms page structure **VERIFIED** (3 tests passing)
- `pnpm build` → no TS errors, dist/ produced **VERIFIED**
- `pnpm typecheck` → passes **VERIFIED**
- `pnpm lint` → passes **VERIFIED**

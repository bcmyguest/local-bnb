const base = import.meta.env.BASE_URL

export const photos: Array<{ src: string; alt: string }> = [
  { src: `${base}images/2022-10-06.jpg`, alt: 'Cottage front entrance in autumn with red door and Adirondack chair' },
  { src: `${base}images/photo1.svg`, alt: 'Cottage exterior with wraparound porch' },
  { src: `${base}images/photo2.svg`, alt: 'Open-concept living room with fireplace' },
  { src: `${base}images/photo3.svg`, alt: 'Fully equipped kitchen' },
  { src: `${base}images/photo4.svg`, alt: 'Primary bedroom with forest view' },
  { src: `${base}images/photo5.svg`, alt: 'Lakefront dock at sunset' },
]

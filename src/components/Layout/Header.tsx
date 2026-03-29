import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CabinIcon from '@mui/icons-material/Cabin'

const navLinks = [
  { label: 'Photos', href: '#photos' },
  { label: 'Location', href: '#location' },
  { label: 'Availability', href: '#availability' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={1}
      sx={{ bgcolor: 'background.paper' }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CabinIcon color="primary" />
          <Typography variant="h6" color="primary.dark" fontWeight={700}>
            Maple Ridge Retreat
          </Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
          {navLinks.map((link) => (
            <Button
              key={link.href}
              color="inherit"
              onClick={() => scrollTo(link.href)}
            >
              {link.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

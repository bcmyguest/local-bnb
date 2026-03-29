import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

interface SectionTitleProps {
  children: React.ReactNode
  id?: string
}

export default function SectionTitle({ children, id }: SectionTitleProps) {
  return (
    <Box sx={{ mb: 3, mt: { xs: 4, md: 6 } }} id={id}>
      <Typography variant="h2" component="h2" color="primary.dark">
        {children}
      </Typography>
      <Box
        sx={{
          width: 60,
          height: 3,
          bgcolor: 'secondary.main',
          mt: 1,
          borderRadius: 1,
        }}
      />
    </Box>
  )
}

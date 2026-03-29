import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import HomePage from '@/pages/HomePage'
import theme from '@/theme/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <HomePage />
      <Footer />
    </ThemeProvider>
  )
}

export default App

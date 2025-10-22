import { Grid, Container, Box, Typography, Fade } from '@mui/material'
import { useEffect, useState } from 'react'
import CountryCard from '../components/CountryCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { fetchAllCountries } from '../api/countriesApi'

export default function Home() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAllCountries()
      .then(data => {
        // Sort countries alphabetically by name
        const sorted = data.sort((a, b) => {
          const nameA = a.name.common.toUpperCase()
          const nameB = b.name.common.toUpperCase()
          return nameA.localeCompare(nameB)
        })
        setCountries(sorted)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#f5f7fa',
        py: 6
      }}
    >
      <Container maxWidth="xl">
        <Fade in timeout={800}>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                color: '#2d3748',
                mb: 2,
                fontSize: { xs: '2.5rem', md: '3.5rem' }
              }}
            >
              Explore Countries
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#718096',
                fontWeight: 300,
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              Discover {countries.length} countries around the world
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={3}>
          {countries.map((country, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={country.cca3}>
              <Fade in timeout={800} style={{ transitionDelay: `${Math.min(index * 50, 1000)}ms` }}>
                <Box
                  sx={{
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)'
                    }
                  }}
                >
                  <CountryCard country={country} />
                </Box>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
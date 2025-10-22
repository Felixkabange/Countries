import { Grid, Container, Box, Typography } from '@mui/material'
import CountryCard from '../components/CountryCard'
import { getFavorites } from '../utils/favorites'
import { useEffect, useState } from 'react'
import { fetchCountryByCode } from '../api/countriesApi'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

export default function Favorites() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const favoriteCodes = getFavorites()
    if (favoriteCodes.length === 0) {
      setCountries([])
      setLoading(false)
      return
    }

    Promise.all(favoriteCodes.map(code => fetchCountryByCode(code)))
      .then(results => {
        // fetchCountryByCode returns array with one element, flatten it
        const flat = results.flat()
        setCountries(flat)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <Box sx={{ minHeight: '100vh', py: 6, background: '#f5f7fa' }}>
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ mb: 4, textAlign: 'center' }}>
          Your Favorite Countries
        </Typography>
        {countries.length === 0 ? (
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            You have no favorites yet.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {countries.map(country => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={country.cca3}>
                <CountryCard country={country} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  )
}

// src/pages/CountryDetails.jsx
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Container, Typography, Box, Button, Grid } from '@mui/material'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { fetchCountryByCode } from '../api/countriesApi'

export default function CountryDetails() {
  const { code } = useParams()
  const navigate = useNavigate()
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCountryByCode(code)
      .then(data => setCountry(data[0]))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [code])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <Container sx={{ py: 4 }}>
      <Button variant="contained" onClick={() => navigate(-1)} sx={{ mb: 3 }}>
        Back
      </Button>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <img
            src={country.flags.svg}
            alt={country.name.common}
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {country.name.common}
          </Typography>
          <Typography variant="body1">
            <strong>Native Name:</strong> {Object.values(country.name.nativeName || {})[0]?.common || 'N/A'}
          </Typography>
          <Typography variant="body1">
            <strong>Population:</strong> {country.population.toLocaleString()}
          </Typography>
          <Typography variant="body1">
            <strong>Region:</strong> {country.region}
          </Typography>
          <Typography variant="body1">
            <strong>Subregion:</strong> {country.subregion || 'N/A'}
          </Typography>
          <Typography variant="body1">
            <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
          </Typography>
          <Typography variant="body1">
            <strong>Timezones:</strong> {country.timezones.join(', ')}
          </Typography>
          <Typography variant="body1">
            <strong>Currencies:</strong>{' '}
            {country.currencies
              ? Object.values(country.currencies).map(c => c.name).join(', ')
              : 'N/A'}
          </Typography>
          <Typography variant="body1">
            <strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}
          </Typography>
          <Typography variant="body1">
            <strong>Borders:</strong> {country.borders?.join(', ') || 'None'}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

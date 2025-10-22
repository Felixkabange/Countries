import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  Box,
  IconButton,
  Card,
  CardContent,
  Divider,
  Button
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { fetchCountryByCode } from '../api/countriesApi'
import { addFavorite, removeFavorite, isFavorite } from '../utils/favorites'

export default function CountryDetails() {
  const { code } = useParams()
  const navigate = useNavigate()
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [favorited, setFavorited] = useState(false)

  useEffect(() => {
    fetchCountryByCode(code)
      .then(data => {
        const fetchedCountry = data[0]
        setCountry(fetchedCountry)
        setFavorited(isFavorite(fetchedCountry.cca3))
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [code])

  const toggleFavorite = () => {
    if (!country) return
    if (favorited) {
      removeFavorite(country.cca3)
      setFavorited(false)
    } else {
      addFavorite(country.cca3)
      setFavorited(true)
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f7fa', py: 6 }}>
      <Container maxWidth="md">
        <Box display="flex" justifyContent="space-between" mb={4}>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              backgroundColor: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              '&:hover': {
                backgroundColor: '#f8f9fa',
                transform: 'translateX(-4px)',
                transition: 'all 0.3s ease'
              }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Button
            variant="contained"
            color={favorited ? 'secondary' : 'primary'}
            startIcon={favorited ? <StarIcon /> : <StarBorderIcon />}
            onClick={toggleFavorite}
          >
            {favorited ? 'Unfavorite' : 'Favorite'}
          </Button>
        </Box>

        <Card sx={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)', borderRadius: 2 }}>
          <CardContent sx={{ p: 4 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <Box sx={{ width: '100%', maxWidth: 500, mb: 4 }}>
                <img
                  src={country.flags.svg}
                  alt={country.name.common}
                  style={{
                    width: '100%',
                    borderRadius: '8px',
                    display: 'block',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
                  }}
                />
              </Box>

              <Typography
                variant="h3"
                gutterBottom
                sx={{ fontWeight: 700, color: '#2d3748', mb: 3 }}
              >
                {country.name.common}
              </Typography>

              <Divider sx={{ width: '100%', mb: 4 }} />

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  width: '100%',
                  maxWidth: 600
                }}
              >
                <DetailRow
                  label="Native Name"
                  value={Object.values(country.name.nativeName || {})[0]?.common || 'N/A'}
                />
                <DetailRow label="Population" value={country.population.toLocaleString()} />
                <DetailRow label="Region" value={country.region} />
                <DetailRow label="Subregion" value={country.subregion || 'N/A'} />
                <DetailRow label="Capital" value={country.capital?.[0] || 'N/A'} />
                <DetailRow label="Timezones" value={country.timezones.join(', ')} />
                <DetailRow
                  label="Currencies"
                  value={
                    country.currencies
                      ? Object.values(country.currencies)
                          .map(c => c.name)
                          .join(', ')
                      : 'N/A'
                  }
                />
                <DetailRow
                  label="Languages"
                  value={country.languages ? Object.values(country.languages).join(', ') : 'N/A'}
                />
                <DetailRow label="Borders" value={country.borders?.join(', ') || 'None'} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

function DetailRow({ label, value }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        flexWrap: 'wrap'
      }}
    >
      <Typography
        component="span"
        sx={{ fontWeight: 600, color: '#4a5568', fontSize: '0.95rem', mr: 1 }}
      >
        {label}:
      </Typography>
      <Typography component="span" sx={{ color: '#718096', fontSize: '0.95rem' }}>
        {value}
      </Typography>
    </Box>
  )
}

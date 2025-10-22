import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'

export default function CountryCard({ country }) {
  return (
    <Card
      sx={{
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          transform: 'translateY(-4px)'
        }
      }}
    >
      <Link
        to={`/country/${country.cca3}`}
        style={{
          textDecoration: 'none',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={country.flags.svg}
          alt={country.name.common}
          sx={{
            objectFit: 'cover',
            borderBottom: '1px solid #e2e8f0'
          }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            p: 3
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: '#2d3748',
              mb: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {country.name.common}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" sx={{ color: '#4a5568' }}>
              <strong style={{ color: '#2d3748' }}>Population:</strong>{' '}
              {country.population.toLocaleString()}
            </Typography>
            <Typography variant="body2" sx={{ color: '#4a5568' }}>
              <strong style={{ color: '#2d3748' }}>Region:</strong> {country.region}
            </Typography>
            <Typography variant="body2" sx={{ color: '#4a5568' }}>
              <strong style={{ color: '#2d3748' }}>Capital:</strong>{' '}
              {country.capital?.[0] || 'N/A'}
            </Typography>
          </Box>
        </CardContent>
      </Link>
    </Card>
  )
}
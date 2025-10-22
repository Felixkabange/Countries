import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'

export default function CountryCard({ country }) {
  return (
    <Card sx={{ maxWidth: 345, m: 1, cursor: 'pointer', height: '100%' }}>
      <Link to={`/country/${country.cca3}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          height="140"
          image={country.flags.svg}
          alt={country.name.common}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {country.name.common}
          </Typography>
          <Box>
            <Typography variant="body2" color="text.secondary">
              <strong>Population:</strong> {country.population.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Region:</strong> {country.region}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
            </Typography>
          </Box>
        </CardContent>
      </Link>
    </Card>
  )
}

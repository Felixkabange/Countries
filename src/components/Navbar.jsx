import { AppBar, Toolbar, Container, TextField, InputAdornment, IconButton, Box, MenuItem, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useState } from 'react'
import { useNavigate, createSearchParams } from 'react-router-dom'

const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

export default function Navbar() {
  const navigate = useNavigate()
  const [searchName, setSearchName] = useState('')
  const [region, setRegion] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    const params = {}
    if (searchName) params.name = searchName
    if (region) params.region = region

    navigate({
      pathname: '/',
      search: createSearchParams(params).toString(),
    })
  }

  const goToFavorites = () => navigate('/favorites')
  const goHome = () => navigate('/')

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ background: '#f5f7fa', borderBottom: '1px solid #e2e8f0' }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'center', py: 2, gap: 2, flexWrap: 'wrap' }}>
          {/* Home button */}
          <Button
            onClick={goHome}
            variant="contained"
            color="primary"
            sx={{ borderRadius: '50px', minWidth: 100 }}
          >
            Home
          </Button>

          {/* Favorites button */}
          <Button
            onClick={goToFavorites}
            startIcon={<FavoriteIcon />}
            variant="contained"
            color="secondary"
            sx={{ borderRadius: '50px', minWidth: 140 }}
          >
            Favorites
          </Button>

          {/* Search form */}
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1, maxWidth: 900 }}
          >
            <TextField
              fullWidth
              size="medium"
              placeholder="Search for a country..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              variant="outlined"
              sx={{
                bgcolor: 'white',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '50px',
                  '& fieldset': { borderColor: '#e2e8f0' },
                  '&:hover fieldset': { borderColor: '#cbd5e0' },
                  '&.Mui-focused fieldset': { borderColor: '#667eea', borderWidth: '2px' },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#718096' }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              select
              size="medium"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              variant="outlined"
              sx={{
                bgcolor: 'white',
                minWidth: 200,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '50px',
                  '& fieldset': { borderColor: '#e2e8f0' },
                  '&:hover fieldset': { borderColor: '#cbd5e0' },
                  '&.Mui-focused fieldset': { borderColor: '#667eea', borderWidth: '2px' },
                },
              }}
            >
              <MenuItem value="">All Regions</MenuItem>
              {regions.map((r) => (
                <MenuItem key={r} value={r}>
                  {r}
                </MenuItem>
              ))}
            </TextField>

            <IconButton
              type="submit"
              sx={{
                bgcolor: '#667eea',
                color: 'white',
                borderRadius: '50px',
                width: 56,
                height: 56,
                flexShrink: 0,
                '&:hover': { bgcolor: '#5568d3', transform: 'scale(1.05)', transition: 'all 0.3s ease' },
              }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

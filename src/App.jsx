import { Container, Typography, Box, Button } from '@mui/material'

export default function App() {
  return (
    <Container>
      <Box textAlign="center" mt={10}>
        <Typography variant="h3" color="primary">
          🚀 MUI is working!
        </Typography>
        <Button variant="contained" color="secondary" sx={{ mt: 4 }}>
          Test Button
        </Button>
      </Box>
    </Container>
  )
}




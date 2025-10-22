import { Box, Typography } from '@mui/material'

export default function ErrorMessage({ message }) {
  return (
    <Box textAlign="center" mt={5}>
      <Typography color="error" variant="h6">
        {message || 'Something went wrong!'}
      </Typography>
    </Box>
  )
}

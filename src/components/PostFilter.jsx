import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import PropTypes from 'prop-types'

export function PostFilter({ field }) {
  return (
    <>
      <Typography
        sx={{ textAlign: 'center', mt: 2 }}
        variant='h4'
        component='div'
      >
        Filter by {field}
      </Typography>
      <Box component='form' sx={{ mt: 3 }} onSubmit={(e) => e.preventDefault()}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id={`filter-${field}`}
              label={field}
              name={`filter-${field}`}
              autoComplete={`filter-${field}`}
            />
          </Grid>
        </Grid>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Apply Filter
        </Button>
      </Box>
    </>
  )
}
PostFilter.propTypes = { field: PropTypes.string.isRequired }

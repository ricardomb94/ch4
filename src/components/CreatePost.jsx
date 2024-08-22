import { Box, Button, Grid, TextField, Typography } from '@mui/material'

export function CreatePost() {
  return (
    <>
      <Typography
        sx={{ textAlign: 'center', mt: 2 }}
        variant='h4'
        component='div'
      >
        Create Post
      </Typography>
      <Box component='form' sx={{ mt: 3 }} onSubmit={(e) => e.preventDefault()}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete='given-title'
              name='create-title'
              required
              fullWidth
              id='create-title'
              label='Title'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id='create-author'
              label='Author'
              name='create-author'
              autoComplete='author-name'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id='create-content'
              label='Content'
              name='create-content'
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Create
        </Button>
      </Box>
    </>
  )
}

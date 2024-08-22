import PropTypes from 'prop-types'
import {
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { useState } from 'react'

export function PostSorting({ fields = [] }) {
  // State to manage selected values
  const [sortBy, setSortBy] = useState(fields[0] || '') // default to the first field or empty string
  const [sortOrder, setSortOrder] = useState('ascending')

  // Handlers for the select inputs
  const handleSortByChange = (event) => {
    setSortBy(event.target.value)
  }

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value)
  }
  return (
    <>
      <Typography
        sx={{ textAlign: 'center', mt: 2 }}
        variant='h5'
        component='div'
      >
        Sort Posts
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id='sortBy-label'>Sort By</InputLabel>
              <Select
                labelId='sortBy-label'
                id='sortBy'
                name='sortBy'
                label='Sort By'
                value={sortBy}
                onChange={handleSortByChange}
              >
                {fields.map((field) => (
                  <MenuItem key={field} value={field}>
                    {field}
                    {console.log('FIELD :', field)};{' '}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id='sortOrder-label'>Sort Order</InputLabel>
              <Select
                labelId='sortOrder-label'
                id='sortOrder'
                name='sortOrder'
                label='Sort Order'
                value={sortOrder}
                onChange={handleSortOrderChange}
              >
                <MenuItem value={'ascending'}>Ascending</MenuItem>
                <MenuItem value={'descending'}>Descending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

PostSorting.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
}

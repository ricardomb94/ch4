import PropTypes from 'prop-types'
import { Card, CardContent, Typography } from '@mui/material'

//Define a function component, accepting title, contents, and author props:
export function Post({ title, contents, author }) {
  //Next, render all props in a way that resembles the mock-up:
  return (
    <Card sx={{ my: 5 }}>
      <Typography
        sx={{ marginLeft: 2 }}
        gutterBottom
        variant='h5'
        component='div'
      >
        {title}
      </Typography>
      <CardContent>
        <Typography variant='body1'>{contents}</Typography>
        <Typography variant='subtitle1'>
          {author && (
            <em>
              <br />
              Written by <strong>{author}</strong>
            </em>
          )}
        </Typography>
      </CardContent>
    </Card>
  )
}

//Now, define propTypes, making sure only title is required
Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
}
//Note : PropTypes are used to validate the props passed to React components and to ensure that we are passing the correct props when using JavaScript. When using a type-safe language, such as TypeScript, we can instead do this by directly typing the props passed to the component.

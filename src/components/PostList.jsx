import PropTypes from 'prop-types'
import { Post } from './Post.jsx'
import { Fragment } from 'react'
import { Box, Divider } from '@mui/material'

export function PostList({ posts = [] }) {
  return (
    <Box>
      {posts.map((post) => (
        <Fragment key={post._id}>
          <Post {...post} />
          {console.log('Post list', <Post {...post} />)}
          <Divider sx={{ my: 2 }} />
        </Fragment>
      ))}
    </Box>
  )
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)).isRequired,
}

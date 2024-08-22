import {
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../services/post.js'

export function postsRoutes(app) {
  app.get('/api/v1/posts', async (req, res) => {
    const { sortBy, sortOrder, author, tag } = req.query
    const options = { sortBy, sortOrder }

    try {
      if (author && tag) {
        return res
          .status(400)
          .json({ error: `query by either author or tag, not both` })
      } else if (author) {
        return res.json(await listPostsByAuthor(author, options))
      } else if (tag) {
        return res.json(await listPostsByTag(tag, options))
      } else {
        return res.json(await listAllPosts(options))
      }
    } catch (err) {
      console.error('error listening posts', err)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  })
  app.get('/api/v1/posts/:id', async (req, res) => {
    const { id } = req.params
    try {
      const post = await getPostById(id)
      if (post === null) return res.status(404).end()
    } catch (err) {
      console.error('error getting post', err)
      return res.status(500).end()
    }
  })

  ////////////// POST REQUEST ////////////////
  app.post('/api/v1/posts', async (req, res) => {
    try {
      const post = await createPost(req.body) // Pass the parsed request body to createPost
      return res.json(post) // Respond with the created post and status 201
    } catch (err) {
      console.error('error  creating post', err)
      return res.status(500).send()
    }
  })

  ////////////// PATCH REQUEST ////////////////
  app.patch('/api/v1/posts/:id', async (req, res) => {
    try {
      const post = await updatePost(req.params.id, res.body)
      return res.json(post)
    } catch (err) {
      console.error('error updating post', err)
      return res.status(504).end()
    }
  })
  ////////////// DELETE REQUEST ////////////////
  app.delete('/api/v1/posts/:id', async (req, res) => {
    try {
      const { deletedPost } = await deletePost(req.params.id)
      if (deletedPost === 0) return res.sendStatus(404)
      return res.status(204).end()
    } catch (err) {
      console.error('error deleting post', err)
      return res.status(500).end()
    }
  })
}

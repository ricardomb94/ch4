import { Post } from '../db/models/posts.js'

/**
 * Creates a new post.
 *
 * @param {Object} param0 - The post details.
 * @param {string} title - The title of the post.
 * @param {string} author - The author of the post.
 * @param {string} contents - The contents of the post.
 * @param {Array<string>} tags - The tags associated with the post.
 * @returns {Promise<Object>} A promise that resolves to the created post.
 */
export async function createPost({ title, author, contents, tags }) {
  const post = new Post({ title, author, contents, tags })
  return await post.save()
}

/**
 * Define a listPost function .
The function accepts a query and an options argument (with sortBy and sortOrder properties). With sortBy, we can define which field we want to sort by, and the sortOrder argument allows us to specify whether posts should be sorted in ascending or descending order. By default, we list all posts (empty object as query) and show the newest posts first (sorted by createdAt, in descending order):
 */

/**
 * Lists posts based on a query and sorting options.
 *
 * @param {Object} query - The query object to filter posts.
 * @param {Object} param1 - The sorting options.
 * @param {string} [param1.sortBy='createAt'] - The field to sort by.
 * @param {string} [param1.sortOrder='descending'] - The order to sort (ascending or descending).
 * @returns {Promise<Array>} A promise that resolves to an array of posts.
 */
export async function listPosts(
  query = {},
  { sortBy = 'createAt', sortOrder = 'descending' } = {},
) {
  //We can use the .find() method from our Mongoose model to list all posts, passing an argument to sort them:
  return await Post.find(query).sort({ [sortBy]: sortOrder })
}

//define a function to list all posts, which simply passes an empty object as query

/**
 *
 * @param {Object} options - Additional options for listing posts.
 * @returns {Promise<Array>} A promise that resolves to an array of posts.
 */
export async function listAllPosts(options) {
  return await listPosts({}, options)
}

/**
 *
 * @param {string} - The author whose posts are to be listed.
 * @param {object} options - Additional options for listing posts
 *  @returns {Promise<Array>} A promise that resolves to an array of posts.
 */
export async function listPostsByAuthor(author, options) {
  return await listPosts({ author }, options)
}

/**
 * Lists posts by specific tags.
 *
 * @param {Array<string>} tags - The tags to filter posts by.
 * @param {Object} options - Additional options for listing posts.
 * @returns {Promise<Array>} A promise that resolves to an array of posts.
 */
export async function listPostsByTag(tags, options) {
  return await listPosts({ tags }, options)
}

export async function getPostById(postId) {
  return await Post.findById(postId)
}

export async function updatePost(postId, { title, author, contents, tags }) {
  return await Post.findOneAndUpdate(
    { _id: postId },
    { $set: { title, author, contents, tags } },
    { new: true },
  )
}

export async function deletePost(postId) {
  return await Post.deleteOne({ _id: postId })
}

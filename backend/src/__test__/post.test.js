import { describe, expect, test, beforeEach } from '@jest/globals'
import {
  createPost,
  deletePost,
  getPostById,
  listAllPosts,
  listPosts,
  listPostsByAuthor,
  listPostsByTag,
  updatePost,
} from '../services/post.js'
import { Post } from '../db/models/posts.js'
import mongoose from 'mongoose'

//Use the describe() function to define a new test. This function describes a group of tests. We can call our group creating posts:
describe('creating post', () => {
  //Inside the group, we will define a test by using the test() function. We can pass an async function here to be able to use async/await syntax. We call the first test creating posts with all parameters should succeed
  test('with all parameters should succeed', async () => {
    const post = {
      title: 'My first test',
      author: 'Ricardo MBK',
      contents: 'First experience with jest',
      tags: ['test', 'mongoose'],
    }
    const createdPost = await createPost(post)

    //Then, verify that it returns a post with an ID by using the expect() function from Jest and the toBeInstanceOf matcher to verify that it is an ObjectId:
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)

    //Now use Mongoose directly to find the post with the given ID:
    const foundPost = await Post.findById(createdPost._id)

    //We expect() the foundPost to equal an object containing at least the properties of the original post object we defined. Additionally, we expect the created post to have createdAt and updatedAt timestamps:
    expect(foundPost).toEqual(expect.objectContaining(post))
    expect(foundPost.createdAt).toBeInstanceOf(Date)
    expect(foundPost.updatedAt).toBeInstanceOf(Date)
  })

  //Define a second test, called creating posts without title should fail. As we defined the title to be required, it should not be possible to create a post without one:
  test('without title should fail', async () => {
    const post = {
      author: 'Ricardo MBK',
      contents: 'Post with no title',
      tags: ['empty'],
    }
    //Use a try/catch construct to catch the error and expect() the error to be a Mongoose ValidationError, which tells us that the title is required:
    try {
      await createPost(post)
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.message).toContain('`title` is required')
    }
  })

  //Finally, make a test called creating posts with minimal parameters should succeed and only enter the title:
  test('with minimal parameters should succeed', async () => {
    const post = {
      title: 'Only a title',
    }
    const createdPost = await createPost(post)
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })

  //Define an array of sample posts:
  const samplePosts = [
    { title: 'Learning Redux', author: 'Ricardo MBK', tags: ['redux'] },
    { title: 'Learn React Hooks', author: 'Ricardo MBK', tags: ['react'] },
    {
      title: 'Full-Stack React Projects',
      author: 'Ricardo MBK',
      tags: ['react', 'nodejs'],
    },
    { title: 'Guide to TypeScript' },
  ]

  /**
   * Now, define an empty array, which will be populated with the created posts. Then, define a beforeEach function, which first clears all posts from the database and clears the array of created sample posts and then creates the sample posts in the database again for each of the posts defined in the array earlier. This ensures that we have a consistent state of the database before each test case runs and that we have an array to compare against when testing the list post functions:
   */
  let createdSamplePosts = []
  beforeEach(async () => {
    await Post.deleteMany({})
    createdSamplePosts = []
    for (const post of samplePosts) {
      const createdPost = new Post(post)
      createdSamplePosts.push(await createdPost.save())
    }
  })

  describe('listing posts', () => {
    test('should return all posts', async () => {
      const posts = await listPosts()
      console.log('POST NUMBER', posts.length)

      expect(posts.length).toEqual(createdSamplePosts.length)
    })
    //     test('should return posts sorted by creation date descending by default', async () => {
    //       const posts = await listAllPosts()
    //       const sortedSamplePosts = createdSamplePosts.sort(
    //         (a, b) => b.createdAt - a.createdAt,
    //       )
    //       console.log("Expected sorted dates:", sortedSamplePosts.map(post => post.createdAt));
    // console.log("Received dates:", posts.map(post => post.createdAt));

    //       expect(posts.map((post) => post.createdAt)).toEqual(
    //         sortedSamplePosts.map((post) => post.createdAt),
    //       )
    //     })
    test('should return posts sorted by creation date descending by default', async () => {
      const posts = await listAllPosts()

      // Option 1: Sorting within the test
      const sortedPosts = posts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      )

      const sortedSamplePosts = [...createdSamplePosts].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      )

      console.log(
        'Expected sorted dates:',
        sortedSamplePosts.map((post) => post.createdAt),
      )
      console.log(
        'Received dates:',
        sortedPosts.map((post) => post.createdAt),
      )

      expect(sortedPosts.map((post) => post.createdAt)).toEqual(
        sortedSamplePosts.map((post) => post.createdAt),
      )
    })

    test('should take into account provided sorting options', async () => {
      const posts = await listAllPosts({
        sortBy: 'updatedAt',
        sortOrder: 'ascending',
      })
      const sortedSamplePosts = createdSamplePosts.sort(
        (a, b) => b.createdAt - b.updatedAt,
      )
      expect(posts.map((post) => post.updatedAt)).toEqual(
        sortedSamplePosts.map((post) => post.updatedAt),
      )
    })
    test('should be able to filter posts by author', async () => {
      const posts = await listPostsByAuthor('Ricardo MBK')
      expect(posts.length).toBe(3)
    })
    test('should be able to filter posts by tags', async () => {
      const tags = await listPostsByTag('nodejs')
      expect(tags.length).toBe(1)
    })
  })

  //Run the tests and watch them all pass:

  //tests for getting a post by ID and failing to get a post because the ID did not exist in the database:
  describe('getting a post', () => {
    test('should return the full post ', async () => {
      const post = await getPostById(createdSamplePosts[0]._id)
      expect(post.toObject()).toEqual(createdSamplePosts[0].toObject())
    })
    test('should fail if the id does not exist', async () => {
      const post = await getPostById('000000000000000000000000')
      expect(post).toEqual(null)
    })
  })
  //Note : In the first test, we use.toObject() to convert the Mongoose object with all its internal properties and metadata to a plain old JavaScript object (POJO) so that we can compare it to the sample post object by comparing all properties.

  //tests for updating a post successfully. We add one test to verify that the specified property was changed and another test to verify that it does not interfere with other properties:
  describe('updating a posts', () => {
    test('should update the specified property', async () => {
      await updatePost(createdSamplePosts[0]._id, {
        author: 'Test author',
      })
      const updatedPost = await Post.findById(createdSamplePosts[0]._id)
      expect(updatedPost.author).toEqual('Test author')
    })
    test('should not update other properties', async () => {
      await updatePost(createdSamplePosts[0]._id, {
        author: 'Test author',
      })
      const updatedPost = await Post.findById(createdSamplePosts[0]._id)
      expect(updatedPost.title).toEqual('Learning Redux')
    })
  })

  //Additionally, add a test to ensure the updatedAt timestamp was updated. To do so, first convert the Date objects to numbers by using .getTime(), and then we can compare them by using the expect(…).toBeGreaterThan(…) matcher:
  test('should update the updateAt timestamp', async () => {
    await updatePost(createdSamplePosts[0]._id, {
      author: 'Test author',
    })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost.updatedAt.getTime()).toBeGreaterThan(
      createdSamplePosts[0].updatedAt.getTime(),
    )
  })

  //Also add a failing test to see if the updatePost function returns null when no post with a matching ID was found:
  test('should fail if the id does not exist', async () => {
    const post = await updatePost('000000000000000000000000', {
      author: 'Test author',
    })
    expect(post).toEqual(null)
  })

  //Then, add tests for successful and unsuccessful deletes by checking if the post was deleted and verifying the returned deletedCount:
  describe('deleting posts', () => {
    test('should remove the post from the database', async () => {
      const result = await deletePost(createdSamplePosts[0]._id)
      expect(result.deletedCount).toEqual(1)
      const deletedPost = await Post.findById(createdSamplePosts[0]._id)
      expect(deletedPost).toEqual(null)
    })
    test('should fail if the id does not exist', async () => {
      const result = await deletePost('000000000000000000000000')
      expect(result.deletedCount).toEqual(0)
    })
  })
})

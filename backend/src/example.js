import { initDatabase } from './db/init.js'
import { Post } from './db/models/posts.js'

await initDatabase()

const post = new Post({
  title: 'Hello folks!',
  author: 'Ricardo MBK',
  contents:
    'This  is another post stored in a MongoDB database using Mongoose.',
  tags: ['mongoose', 'mongodb'],
})

await post.save()

// const createdPost = await Post.find()
// await Post.findByIdAndUpdate(createdPost._id, {$set:{title:'Hey there, me again, mongoose'}})

// console.log(post);

const createdPost = await post.save()

await Post.findByIdAndUpdate(createdPost._id, {
  $set: { title: 'Hey there,' },
})

const posts = await Post.find()
console.log(posts)

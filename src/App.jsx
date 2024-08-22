// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { Container } from '@mui/material'
// import { Post } from "./components/Post.jsx";
import { CreatePost } from './components/CreatePost.jsx'
import { PostFilter } from './components/PostFilter.jsx'
import { PostSorting } from './components/PostSorting.jsx'
// import { PostList } from "./components/PostList.jsx";
import { Post } from './components/Post.jsx'

export function App() {
  return (
    <>
      <Container>
        <CreatePost />
        <PostFilter field='author' />
        <PostSorting fields={['createdAt', 'updatedAt']} />
        <Post
          title='Full-Stack React Projects'
          contents="Let's become full-stack developers!"
          author='Ricardo'
        />
        <Post title='Hello React' />
        {/* <PostList posts={[]} /> */}
      </Container>
    </>
  )
}

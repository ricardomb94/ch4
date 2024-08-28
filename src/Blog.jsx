import { useQuery } from "@tanstack/react-query";
import { Container } from "@mui/material";
import { CreatePost } from "./components/CreatePost.jsx";
import { PostFilter } from "./components/PostFilter.jsx";
import { PostSorting } from "./components/PostSorting.jsx";
import { PostList } from "./components/PostList.jsx";
import { getPosts } from "./api/posts.js";

export function Blog() {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });
  const posts = postsQuery.data ?? [];
  console.log("POSTS", posts);

  return (
    <>
      <Container>
        <CreatePost />
        <PostFilter field='author' />
        <PostSorting fields={["createdAt", "updatedAt"]} />
        <PostList posts={posts} />
      </Container>
    </>
  );
}

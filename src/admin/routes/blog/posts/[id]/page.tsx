import { useAdminCustomQuery } from "medusa-react"
import { useParams } from "react-router-dom"

type BlogPost = {
  title: string,
  content: string,
  author_id: string,
}

// Single post
type AdminBlogPostQuery = {
  expand?: string,
  fields?: string
}

type AdminBlogPostRes = {
  post: BlogPost,
}

const BlogPost = () => {
  const { id } = useParams() 

  const { data, isLoading } = useAdminCustomQuery<
    AdminBlogPostQuery,
    AdminBlogPostRes
  >(
    `/blog/posts/${id}`,  // path
    ["blog-post", id], // queryKey
    {
      expand: "author", // query
    }
   )

  return (
    <>
      {isLoading && <span>Loading...</span>}
      {data && data.post && <span>{data.post.title}</span>}
    </>
  )
}

export default BlogPost
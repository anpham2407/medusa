import { useAdminCustomPost } from "medusa-react"
import { useNavigate } from "react-router-dom"

type BlogPost = {
  id: string
  title: string,
  content: string,
  author_id: string,
}

type AdminBlogPostReq = {
  title: string,
  content: string,
  author_id: string,
}

type AdminBlogPostRes = {
  post: BlogPost,
}

const CreateBlogPost = () => {
  const navigate = useNavigate() 

  const { mutate, isLoading } = useAdminCustomPost<
    AdminBlogPostReq,
    AdminBlogPostRes
  >(
    `/a/blog/posts`,
    ["blog-posts"],
    {
      product: true,
    }
   )

  const handleCreate = (args: AdminBlogPostReq) => {
    return mutate(args, {
      onSuccess: (data) => {
        navigate(`/a/blog/posts/${data.post.id}`)
      },
    })
  }

  // TODO replace with actual form
  return (
    <button
      onClick={() => handleCreate({
        title: "First Blog Post",
        content: "Blog Content",
        author_id: "auth_123",
      })}>
        Create 111
    </button>
  )
}

export default CreateBlogPost
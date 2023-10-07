import { Request, Response } from "express";
import PostService from "../../../../services/post";

export default async function createPost(req: Request, res: Response) {
  const postService: PostService = req.scope.resolve(
    "postService"
  )

  // basic validation of request body
  if (!req.body.title || !req.body.author_id) {
    throw new Error("`title` and `author_id` are required.")
  }

  const post = await postService.create(req.body)

  res.json({
    post,
  })

}

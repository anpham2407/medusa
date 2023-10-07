import { Request, Response } from "express";
import PostService from "../../../../services/post";

export default async function deletePost(req: Request, res: Response) {
  const postService: PostService = req.scope.resolve(
    "postService"
  )

  res.status(200).json({
    posts: await postService.delete(req.params.id),
  })
}

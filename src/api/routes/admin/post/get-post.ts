import { Request, Response } from "express";
import PostService from "../../../../services/post";

export default async function getPostList(req: Request, res: Response) {
  const postService: PostService = req.scope.resolve(
    "postService"
  )

  res.status(200).json({
    posts: await postService.list({}),
  })
}

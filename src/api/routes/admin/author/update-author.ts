import { Request, Response } from "express";
import AuthorService from "../../../../services/author";

export default async function updateAuthor(req: Request, res: Response) {
  const authorService: AuthorService = req.scope.resolve(
    "authorService"
  )

  res.status(200).json({
    posts: await authorService.update(req.params.id, req.body),
  })
}

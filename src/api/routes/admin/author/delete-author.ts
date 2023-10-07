import { Request, Response } from "express";
import AuthorService from "../../../../services/author";

export default async function deleteAuthor(req: Request, res: Response) {
  const authorService: AuthorService = req.scope.resolve(
    "authorService"
  )

  res.status(200).json({
    posts: await authorService.delete(req.params.id),
  })
}

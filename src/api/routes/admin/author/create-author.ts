import { Request, Response } from "express";
import AuthorService from "../../../../services/author";
import { MedusaError } from "@medusajs/utils"

export default async function createAuthor(req: Request, res: Response) {
  const authorService: AuthorService = req.scope.resolve(
    "authorService"
  )

  // basic validation of request body
  if (!req.body.name || !req.body.image) {
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      "Post was not found"
    )
  }

  const author = await authorService.create(req.body)

  res.json({
    author,
  })

}

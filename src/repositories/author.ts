import { Author } from "../models/author"
import { 
  dataSource,
} from "@medusajs/medusa/dist/loaders/database"

export const AuthorRepository = dataSource
  .getRepository(Author)
  .extend({
    customMethod(): void {
      // TODO add custom implementation
      return
    },
  })

export default AuthorRepository
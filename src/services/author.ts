import { 
  FindConfig,
  Selector,
  TransactionBaseService,
  buildQuery,
} from "@medusajs/medusa"
import { EntityManager } from "typeorm"
import AuthorRepository from "../repositories/author"
import { Author } from "../models/author"
import { MedusaError } from "@medusajs/utils"

class AuthorService extends TransactionBaseService {
  protected manager_: EntityManager
  protected transactionManager_: EntityManager
  protected authorRepository_: typeof AuthorRepository

  constructor(container) {
    super(container)
    this.authorRepository_ = container.authorRepository
  }

  async listAndCount(
    selector?: Selector<Author>,
    config: FindConfig<Author> = {
      skip: 0,
      take: 20,
      relations: [],
  }): Promise<[Author[], number]> {
    const authorRepo = this.activeManager_.withRepository(
      this.authorRepository_
    )

    const query = buildQuery(selector, config);

    return await authorRepo.findAndCount(query);
  }
  
  async list(
    selector?: Selector<Author>,
    config: FindConfig<Author> = {
      skip: 0,
      take: 20,
      relations: [],
  }): Promise<any> {
    const [authors, count] = await this.listAndCount({}, config)

    return {authors, count}
  }

  async retrieve(
    id: string,
    config?: FindConfig<Author>
  ): Promise<Author> {
    const authorRepo = this.activeManager_.withRepository(
      this.authorRepository_
    )

    const query = buildQuery({
      id,
    }, config)

    const author = await authorRepo.findOne(query)

    if (!author) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        "Author was not found"
      )
    }

    return author
  }

  async create(
    data: Pick<Author, "name" | "image">
  ): Promise<Author> {
    return this.atomicPhase_(async (manager) => {
      const authorRepo = manager.withRepository(
        this.authorRepository_
      )
      const post = authorRepo.create(data)
      const result = await authorRepo.save(post)

      return result
    })
  }

  async update(
    id: string,
    data: Omit<Partial<Author>, "id">
  ): Promise<Author> {
    return await this.atomicPhase_(async (manager) => {
      const authorRepo = manager.withRepository(
        this.authorRepository_
      )
      const author = await this.retrieve(id)
      
      Object.assign(author, data)

      return await authorRepo.save(author)
    })
  }

  async delete(id: string): Promise<void> {
    return await this.atomicPhase_(async (manager) => {
      const authorRepo = manager.withRepository(
        this.authorRepository_
      )
      const author = await this.retrieve(id)
      
      await authorRepo.remove([author])
    })
  }
}

export default AuthorService
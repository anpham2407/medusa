import { Request, Response } from "express"
import ProductMediaService 
  from "../../../../services/product-media"
import { MediaType } from "../../../../models/product-media"

// retrieve a list of product medias
export default async (req: Request, res: Response) => {
  const productMediaService = req.scope.resolve<
    ProductMediaService
  >("productMediaService")
  // omitting pagination for simplicity
  const [productMedias, count] = await productMediaService
    .listAndCount({
      type: MediaType.MAIN,
    }, {
      relations: ["variant"],
    }
  )

  res.json({
    product_medias: productMedias,
    count,
  })
}
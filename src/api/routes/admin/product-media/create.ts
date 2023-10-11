import { Request, Response } from "express"
import ProductMediaService 
  from "../../../../services/product-media"

// create a product media for a variant
export default async (req: Request, res: Response) => {
  // validation omitted for simplicity
  const {
    variant_id,
    file_key,
    type = "main",
    name,
    mime_type
  } = req.body

  const productMediaService = req.scope.resolve<
    ProductMediaService
  >("productMediaService")
  const productMedia = await productMediaService.create({
    variant_id,
    file_key,
    type,
    name,
    mime_type,
  })

  res.json({
    product_media: productMedia,
  })
}
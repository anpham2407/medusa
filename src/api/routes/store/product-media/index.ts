import { wrapHandler } from "@medusajs/utils"
import { Router } from "express"
import list from "./list"
import { 
    requireCustomerAuthentication,
  } from "@medusajs/medusa"
  import download from "./download"

const router = Router()

export default (storeRouter: Router) => {
  storeRouter.use("/product-media", router)

  router.get("/", wrapHandler(list))

  router.get(
    "/download/:variant_id",
    requireCustomerAuthentication(),
    wrapHandler(download)
  )
}
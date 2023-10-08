import { wrapHandler } from "@medusajs/utils"
import { Router } from "express"
import create from "./create"
import list from "./list"

const router = Router()

export default (adminRouter: Router) => {
  adminRouter.use("/product-media", router)

  router.get("/", wrapHandler(list))
  router.post("/", wrapHandler(create))
}
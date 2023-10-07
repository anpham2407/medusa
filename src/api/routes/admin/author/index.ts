import { wrapHandler } from "@medusajs/utils";
import { Router } from "express";
import getAuthor from "./get-author";
import updateAuthor from "./update-author";
import createAuthor from "./create-author";
import deleteAuthor from "./delete-author";

const router = Router();

export default (adminRouter: Router) => {
  adminRouter.use("/author", router);

  router.get("/", wrapHandler(getAuthor));
  router.post("/", wrapHandler(createAuthor));
  router.put("/:id", wrapHandler(updateAuthor));
  router.delete("/:id", wrapHandler(deleteAuthor));
};

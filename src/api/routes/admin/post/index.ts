import { wrapHandler } from "@medusajs/utils";
import { Router } from "express";
import getPost from "./get-post";
import createPost from "./create-post";
import deletePost from "./delete-post";
import updatePost from "./update-post";

const router = Router();

export default (adminRouter: Router) => {
  adminRouter.use("/post", router);

  router.get("/", wrapHandler(getPost));
  router.post("/", wrapHandler(createPost));
  router.delete("/:id", wrapHandler(deletePost));
  router.put("/:id", wrapHandler(updatePost));
};

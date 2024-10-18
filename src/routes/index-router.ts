import {Router} from "express";
import {deletePostDETELE, getPostsGET} from "../controllers/post-controller.js";

const indexRouter = Router();

indexRouter.get('/', getPostsGET).get('/:postId', deletePostDETELE);

export default indexRouter;
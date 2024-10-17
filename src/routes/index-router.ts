import {Router} from "express";
import {getPostsGET} from "../controllers/post-controller.js";

const indexRouter = Router();

indexRouter.get('/', getPostsGET);

export default indexRouter;
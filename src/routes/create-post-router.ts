import {Router} from "express";
import {createPostPOST} from "../controllers/post-controller.js";

const createPostRouter = Router();

createPostRouter.get("/", (req, res) => {
    res.render('forms/create-post-form');
}).post("/", createPostPOST);

export default createPostRouter;

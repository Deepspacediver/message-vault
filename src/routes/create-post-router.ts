import {Router} from "express";
import {createPostPOST} from "../controllers/post-controller.js";
import {isUserAuthorized} from "../middlewares/is-user-authorized.js";

const createPostRouter = Router();

createPostRouter.use(isUserAuthorized).get("/", (req, res) => {
    res.render('forms/create-post-form');
}).post("/", createPostPOST);

export default createPostRouter;

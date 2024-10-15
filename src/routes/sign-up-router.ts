import {Router} from 'express';
import {createUserPost} from "../controllers/sign-up-controller.js";

const signUpRouter = Router();

signUpRouter.get("/", (req, res) => {
    res.render("forms/sign-up-form");
}).post("/", createUserPost);

export default signUpRouter;
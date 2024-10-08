import {Router} from 'express';

const signUpRouter = Router();

signUpRouter.get("/", (req, res) => {
    res.render("forms/sign-up-form");
});

export default signUpRouter;
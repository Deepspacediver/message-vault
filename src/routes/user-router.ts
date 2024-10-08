import {Router} from "express";
import {assignNewRolePut, createUserPost} from "../controllers/user-controllers.js";

const userRouter = Router();

userRouter.post("/", createUserPost)
    .put('/:userId/role', assignNewRolePut);

export default userRouter;
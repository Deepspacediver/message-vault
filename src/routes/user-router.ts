import {Router} from "express";
import {assignNewRolePut} from "../controllers/user-controllers.js";

const userRouter = Router();

userRouter.put('/:userId/role', assignNewRolePut);

export default userRouter;
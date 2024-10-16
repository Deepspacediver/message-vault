import {Router} from "express";
import {assignNewRolePost} from "../controllers/role-controller.js";
import {isSignedInMiddleware} from "../middlewares/is-signed-in-middleware.js";

const roleRouter = Router();

roleRouter.use(isSignedInMiddleware).get("/", (req, res) => {
    res.render("forms/role-form");
}).post("/", assignNewRolePost);

export default roleRouter;
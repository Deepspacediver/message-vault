import {Router} from "express";

const errorRouter = Router();

errorRouter.get('/', (req, res) => {
    res.render("error-pages/unauthorized-page");
});

export default errorRouter;
import {Router} from "express";

const errorRouter = Router();

errorRouter.get('/', (req, res) => {
    res.render("error-pages/unauthorized-page");
}).get("/generic", (req, res) => {
    res.render("error-pages/generic-error-page");
});

export default errorRouter;
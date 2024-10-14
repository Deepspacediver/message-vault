import {Router} from "express";

const signOutRouter = Router();

signOutRouter.get('/', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        res.redirect('/');
    });
});
export default signOutRouter;
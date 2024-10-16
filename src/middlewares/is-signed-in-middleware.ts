import {RequestHandler} from "express";

export const isSignedInMiddleware: RequestHandler = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.redirect('/sign-in');
};
import {RequestHandler} from "express";
import {UserRoles} from "../types/user-types.js";

export const isUserAuthorized: RequestHandler = (req, res, next) => {
    if (req.user?.role === UserRoles.USER || !req.user) {
        return res.redirect('/error');
    }
    return next();
};
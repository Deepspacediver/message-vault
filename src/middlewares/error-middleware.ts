import {ErrorRequestHandler} from "express";
import {ZodIssue} from "zod";
import BadRequestError from "../partials/bad-request-error.js";

export const getZodErrorMessages = (zodIssues: ZodIssue[]) => {
    return zodIssues.map(({message}) => message);
};

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, next) => {

    if (err instanceof BadRequestError) {
        res.render(err.viewFilePath, {errors: err.errors});
        return next();
    }

    //TODO: add error page
    res.status(500).json({error: 'Internal Server Error'});
    next();
};
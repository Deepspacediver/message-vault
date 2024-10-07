import {ErrorRequestHandler} from "express";
import {ZodError, ZodIssue} from "zod";

const getZodErrorMessages = (zodIssues: ZodIssue[]) => {
    return zodIssues.map(({message}) => message).join(", ");
};

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof ZodError) {
        const errorMessages = getZodErrorMessages(err.issues);
        res.status(400).json({error: errorMessages});
        return next();
    }

    if (err instanceof Error) {
        const errorMessage = err.message;
        res.status(400).json({error: errorMessage});
        return next();
    }

    res.status(500).json({error: 'Internal Server Error'});
    next();
};
import asyncHandler from "express-async-handler";
import {schemaRequestParser} from "../helpers/schema-parse.js";
import {CreateUserSchema} from "../schemas/user-schemas.js";
import {getZodErrorMessages} from "../middlewares/error-middleware.js";
import BadRequestError from "../partials/bad-request-error.js";
import {createUser} from "../db/user-queries.js";
import bcrypt from "bcryptjs";

export const createUserPost = asyncHandler(async (req, res, next) => {
    const result = schemaRequestParser(CreateUserSchema, req);
    
    if (!result.success) {
        const zodMessages = getZodErrorMessages(result.error.issues);
        throw new BadRequestError("Bad request", zodMessages, 'forms/sign-up-form');
    }
    const {userName, firstName, lastName, password} = req.body;

    bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
            return next(err);
        }

        const user = await createUser({
            userName, firstName, password: hashedPassword, lastName
        });

        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/sign-up');
        });

    });
});
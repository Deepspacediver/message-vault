import asyncHandler from "express-async-handler";
import {schemaRequestParser} from "../helpers/schema-parse.js";
import {CreateUserSchema} from "../schemas/user-schemas.js";
import {getZodErrorMessages} from "../middlewares/error-middleware.js";
import BadRequestError from "../partials/bad-request-error.js";
import {createUser} from "../db/user-queries.js";

export const createUserPost = asyncHandler(async (req, res) => {
    const result = schemaRequestParser(CreateUserSchema, req);
    if (!result.success) {
        const zodMessages = getZodErrorMessages(result.error.issues);
        throw new BadRequestError("Bad request", zodMessages, 'forms/sign-up-form');
    }
    const {userName, firstName, lastName, password} = req.body;
    await createUser({userName, firstName, password, lastName});
    res.redirect('/sign-in');
});
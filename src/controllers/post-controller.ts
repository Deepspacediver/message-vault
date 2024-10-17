import asyncHandler from "express-async-handler";
import {schemaRequestParser} from "../helpers/schema-parse.js";
import {CreatePostSchema} from "../schemas/post-schemas.js";
import {getZodErrorMessages} from "../middlewares/error-middleware.js";
import BadRequestError from "../partials/bad-request-error.js";
import {createPost} from "../db/post-queries.js";


export const createPostPOST = asyncHandler(async (req, res) => {
    const result = schemaRequestParser(CreatePostSchema, req);
    if (!result.success) {
        const errorMessages = getZodErrorMessages(result.error.issues);
        throw new BadRequestError("Bad request", errorMessages,
            'forms/create-post-form');
    }
    const {content, title} = req.body;
    const userId = req.user?.user_id as number;
    await createPost({userId, content, title});

    //TODO change redirect to /posts
    res.redirect("/");
});
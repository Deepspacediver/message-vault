import asyncHandler from "express-async-handler";
import {schemaRequestParser} from "../helpers/schema-parse.js";
import {CreatePostSchema, DeletePostSchema, GetPostsSchema} from "../schemas/post-schemas.js";
import {getZodErrorMessages} from "../middlewares/error-middleware.js";
import BadRequestError from "../partials/bad-request-error.js";
import {
    createPost,
    deletePost,
    getPostsForMemberAndAdmin,
    getPostsForUser
} from "../db/post-queries.js";
import {UserRoles} from "../types/user-types.js";


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

    res.redirect("/");
});

export const getPostsGET = asyncHandler(async (req, res) => {
    if (!req.user) {
        return res.render('pages/index');
    }
    const result = schemaRequestParser(GetPostsSchema, req);
    if (!result.success) {
        const errorMessages = getZodErrorMessages(result.error.issues);
        throw new BadRequestError("Bad request", errorMessages,
            'pages/index');
    }
    const hasUserRole = req.user?.role === UserRoles.USER;
    const posts = hasUserRole ? await getPostsForUser() : await getPostsForMemberAndAdmin();
    res.render('pages/index', {posts});
});

export const deletePostDETELE = asyncHandler(async (req, res) => {
    const result = schemaRequestParser(DeletePostSchema, req);
    if (!result.success) {
        const errorMessages = getZodErrorMessages(result.error.issues);
        throw new BadRequestError("Bad request", errorMessages,
            'pages/index');
    }
    const {postId} = req.params;
    await deletePost(+postId);
    res.redirect('/');
});
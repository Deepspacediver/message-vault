import z from "zod";
import {UserRoles} from "../types/user-types.js";

export const CreatePostSchema = z.object({
    body: z.object({
        title: z.string().min(5, "Title of the post must be at least 5 characters long"),
        content: z.string().min(15, "Content of the post must be at least 15 characters long")
    }),
    user: z.object({
        user_id: z.coerce.number({message: "User id must be a number"}),
        role: z.union([z.literal(UserRoles.ADMIN), z.literal(UserRoles.MEMBER)],
            {message: "You are unauthorized to create a post"})
    })
});
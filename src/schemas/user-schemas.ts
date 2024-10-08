import z from "zod";
import {UserRoles} from "../types/user-types.js";

const UserIdSchema = z.coerce.number({message: "User id must be a numer"});
const UserNameSchema = z.coerce.string({message: "Username must be a string"}).trim();
const FirstNameSchema = z.coerce.string({message: "First name must be a string"}).trim();
const LastNameSchema = z.coerce.string({message: "Last name must be a string"}).trim();
const PasswordSchema = z.coerce.string({message: "Password must be a string"}).trim();
const UserRoleSchema = z.nativeEnum(UserRoles);

export const CreateUserSchema = z.object({
    body: z.object({
        userName: UserNameSchema,
        firstName: FirstNameSchema,
        lastName: LastNameSchema,
        password: PasswordSchema,
    })
});

export const AssignUserRoleSchema = z.object({
    body: z.object({
            role: UserRoleSchema
        },
    ),
    params: z.object({
        userId: UserIdSchema,

    })
});
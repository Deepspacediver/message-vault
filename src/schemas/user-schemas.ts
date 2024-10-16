import z from "zod";
import {UserRoles} from "../types/user-types.js";

const UserIdSchema = z.coerce.number({message: "To change role you need to be signed in"});
const UserNameSchema = z.coerce.string({message: "Username must be a string"}).trim();
const FirstNameSchema = z.coerce.string({message: "First name must be a string"}).trim();
const LastNameSchema = z.coerce.string({message: "Last name must be a string"}).trim();
const PasswordSchema = z.coerce.string({message: "Password must be a string"})
    .min(5, "Password must be at least 5 characters long");
const UserRoleSchema = z.nativeEnum(UserRoles);
const RolePasswordsSchema = z.coerce.string();

export const CreateUserSchema = z.object({
    body: z.object({
        userName: UserNameSchema,
        firstName: FirstNameSchema,
        lastName: LastNameSchema,
        password: PasswordSchema,
    })
});

export const AssignUserRoleSchema = z.object({
    user: z.object({
        user_id: UserIdSchema
    }),
    body: z.object({
            role: UserRoleSchema,
            password: RolePasswordsSchema
        },
    ).refine((data) => {
        if (data.role === UserRoles.MEMBER) {
            return data.password === process.env.MEMBER_PASSWORD;
        }
        return data.password === process.env.ADMIN_PASSWORD;
    }, {message: "Incorrect secret password"}),

});
import z from "zod";
import {UserRoles} from "../types/user-types.js";

const UserNameSchema = z.coerce.string({message: "Username must be a string"}).trim();
const FirstNameSchema = z.coerce.string({message: "First name must be a string"}).trim();
const LastNameSchema = z.coerce.string({message: "Last name must be a string"}).trim();
const PasswordSchema = z.coerce.string({message: "Password must be a string"}).trim();

export const CreateUserSchema = z.object({
    body: z.object({
        userName: UserNameSchema,
        firstName: FirstNameSchema,
        lastName: LastNameSchema,
        role: z.literal(UserRoles.USER),
        password: PasswordSchema,
    })
});
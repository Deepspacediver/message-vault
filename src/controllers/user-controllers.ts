import asyncHandler from "express-async-handler";
import {schemaRequestParser} from "../helpers/schema-parse.js";
import {AssignUserRoleSchema, CreateUserSchema} from "../schemas/user-schemas.js";
import {changeUserRole, createUser} from "../db/user-queries.js";

export const createUserPost = asyncHandler(async (req, res) => {
    schemaRequestParser(CreateUserSchema, req);
    const {userName, firstName, lastName, password} = req.body;
    const data = await createUser({userName, firstName, password, lastName});
    res.json(data);
});

export const assignNewRolePut = asyncHandler(async (req, res) => {
    schemaRequestParser(AssignUserRoleSchema, req);
    const {role} = req.body;
    const {userId} = req.params;
    await changeUserRole(+userId, role);
    res.status(200).json({message: `The role of the user has been changed to ${role}`});
});
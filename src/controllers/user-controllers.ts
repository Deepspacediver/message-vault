import asyncHandler from "express-async-handler";
import {schemaRequestParser} from "../helpers/schema-parse.js";
import {AssignUserRoleSchema} from "../schemas/user-schemas.js";
import {changeUserRole} from "../db/user-queries.js";


export const assignNewRolePut = asyncHandler(async (req, res) => {
    schemaRequestParser(AssignUserRoleSchema, req);
    const {role} = req.body;
    const {userId} = req.params;
    await changeUserRole(+userId, role);
    res.status(200).json({message: `The role of the user has been changed to ${role}`});
});

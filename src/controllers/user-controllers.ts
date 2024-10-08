import asyncHandler from "express-async-handler";
import {schemaRequestParser} from "../helpers/schema-parse.js";
import {CreateUserSchema} from "../schemas/user-schemas.js";
import {createUser} from "../db/user-queries.js";

export const createUserPost = asyncHandler(async (req, res) => {
    schemaRequestParser(CreateUserSchema, req);
    const {userName, firstName, lastName, role, password} = req.body;
    const data = await createUser({userName, firstName, role, password, lastName});
    res.json(data);
});

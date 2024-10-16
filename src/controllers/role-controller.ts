import asyncHandler from "express-async-handler";
import {schemaRequestParser} from "../helpers/schema-parse.js";
import {AssignUserRoleSchema} from "../schemas/user-schemas.js";
import {changeUserRole} from "../db/user-queries.js";
import BadRequestError from "../partials/bad-request-error.js";
import {getZodErrorMessages} from "../middlewares/error-middleware.js";


export const assignNewRolePost = asyncHandler(async (req, res) => {
    const result = schemaRequestParser(AssignUserRoleSchema, req);
    if (!result.success) {
        const zodMessages = getZodErrorMessages(result.error.issues);
        throw new BadRequestError("Bad request", zodMessages, 'forms/role-form');
    }
    const {role} = req.body;
    const userId = req.user?.user_id as string | number;
    await changeUserRole(+userId, role);
    res.redirect("/");
});

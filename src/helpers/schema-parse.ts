import {Schema} from "zod";
import {Request} from "express";

export const schemaRequestParser = (requestSchema: Schema, request: Request) => {
    return requestSchema.safeParse(request);
};
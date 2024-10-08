import {Schema} from "zod";
import {Request} from "express";

export const schemaRequestParser = (requestSchema: Schema, request: Request) => {
    requestSchema.parse(request);
};
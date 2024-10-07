import 'dotenv/config';
import express from "express";
import {errorMiddleware} from "./middlewares/error-middleware.js";

const app = express();

app.use(errorMiddleware);

app.listen(process.env.PORT || 3000, () => {
    console.log(`App listening at http://localhost:3000`);
});


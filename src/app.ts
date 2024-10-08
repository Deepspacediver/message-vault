import 'dotenv/config';
import express from "express";
import {errorMiddleware} from "./middlewares/error-middleware.js";
import path from "path";
import signUpRouter from "./routes/sign-up-router.js";
import userRouter from "./routes/user-router.js";

const __dirname = import.meta.dirname;


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../src/views"));


app.use("/sign-up", signUpRouter);
app.use("/users", userRouter);

app.use(errorMiddleware);

app.listen(process.env.PORT || 3000, () => {
    console.log(`App listening at http://localhost:3000`);
});


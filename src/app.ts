import 'dotenv/config';
import express from "express";
import expressSession from "express-session";
import expressLayouts from "express-ejs-layouts";
import {errorMiddleware} from "./middlewares/error-middleware.js";
import path from "path";
import signUpRouter from "./routes/sign-up-router.js";
import userRouter from "./routes/user-router.js";
import connectPgSimple from "connect-pg-simple";
import {pool} from "./db/pool.js";
import passport from "passport";
import {getUserById} from "./db/user-queries.js";
import {User as UserT, UserRoles} from "./types/user-types.js";
import signInRouter from "./routes/sign-in-router.js";
import passportConfig from "./configs/passport-config.js";
import signOutRouter from "./routes/sign-out-router.js";
import roleRouter from "./routes/role-router.js";
import indexRouter from "./routes/index-router.js";
import createPostRouter from "./routes/create-post-router.js";
import errorRouter from "./routes/error-router.js";

declare global {
    namespace Express {
        interface User extends UserT {
        }
    }
}
const app = express();

const __dirname = import.meta.dirname;


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../src/views"));
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "../public")));

const pgSession = connectPgSimple(expressSession);

app.use(expressSession({
    store: new pgSession({
        pool,
        tableName: process.env.SESSION_TABLE,
        createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET ?? '',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.authenticate("session"));
passport.use(passportConfig);

passport.serializeUser((user, done) => {
    return done(null, user.user_id);
});

passport.deserializeUser(async (userId: number, done) => {
    try {
        const user = await getUserById(userId);
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
});

app.use(passport.session());
app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.isLogged = !!req.user;
    res.locals.isAdmin = req.user?.role === UserRoles.ADMIN;
    next();
});


app.use("/sign-up", signUpRouter);
app.use("/sign-in", signInRouter);
app.use("/sign-out", signOutRouter);
app.use("/users", userRouter);
app.use("/role", roleRouter);
app.use("/create-post", createPostRouter);
app.use("/error", errorRouter);
app.use("", indexRouter);

app.use(errorMiddleware);

app.listen(process.env.PORT || 3000, () => {
    console.log(`App listening at http://localhost:3000`);
});


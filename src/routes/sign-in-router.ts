import {Router} from 'express';
import passport from "passport";

declare module 'express-session' {
    export interface SessionData {
        messages?: string[];
    }
}

const signInRouter = Router();

signInRouter.get('/', (req, res) => {
    if (!!req.user) {
        return res.redirect('/');
    }
    const messages = req?.session?.messages ?? null;
    req.session.messages = [];
    res.render('forms/sign-in-form', {errors: messages});
}).post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/sign-in',
    failureMessage: true
}));

export default signInRouter;
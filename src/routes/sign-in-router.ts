import {Router} from 'express';
import passport from "passport";

const signInRouter = Router();

signInRouter.get('/', (req, res) => {
    res.render('forms/sign-in-form');
}).post('/', passport.authenticate('local', {
    successRedirect: '/sign-up',
    failureRedirect: '/sign-in'
}));

export default signInRouter;
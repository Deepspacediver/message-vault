import {Strategy as LocalStrategy} from "passport-local";
import {getUserByUsername} from "../db/user-queries.js";
import {arePasswordsMatching} from "../helpers/password-helpers.js";

const customCredentialFields = {
    usernameField: "userName",
    passwordField: "password",
};


const passportConfig = new LocalStrategy(customCredentialFields,
    async function (username, password, done) {
        try {
            const user = await getUserByUsername(username);
            if (!user) {
                return done(null, false, {message: "Incorrect username"});
            }

            const arePasswordsEqual = await arePasswordsMatching(password, user.password);

            if (!arePasswordsEqual) {
                return done(null, false, {message: "Incorrect password"});
            }
            return done(null, user);

        } catch (err) {
            return done(err);
        }
    }
);

export default passportConfig;
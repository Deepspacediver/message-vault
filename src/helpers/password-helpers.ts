import bcrypt from "bcryptjs";

export const arePasswordsMatching = async (passwordInput: string, passwordHash: string) => {
    return await bcrypt.compare(passwordInput, passwordHash);
};
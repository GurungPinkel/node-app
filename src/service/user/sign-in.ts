import { BadRequestError } from "@pinkelgrg/app-common";
import { findByEmailDAO } from "../../dao/user/find";
import { Password } from "../../utils/password";
import { logger } from "../../config/winston";

export const VerifyCredentials = async (email: string, password: string) => {
    const user = await findByEmailDAO(email);
    if (!user) {
        logger.info(`Invalid email. User does not exist: ${email}`);
        throw new BadRequestError("Invalid Credentials");
    }
    const isPasswordMatch = Password.compare(user.password, password);

    if (!isPasswordMatch) {
        logger.info(`Invalid password for user: ${email}`);
        throw new BadRequestError("Invalid Credentials");
    }
    return user;
};

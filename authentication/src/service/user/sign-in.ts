import { BadRequestError } from "@pinkelgrg/app-common";
import { findByEmailDAO } from "../../dao/user/find";
import { Password } from "../../utils/password";
import { logger } from "../../config/winston";

const VerifyCredentials = async (email: string, password: string) => {
    const user = await findByEmailDAO(email);
    if (!user) {
        logger.info(`Invalid email. User does not exist: ${email}`);
        throw new BadRequestError("Invalid Credentials");
    }
    const isPasswordMatch = await Password.compare(user.password, password);

    if (!isPasswordMatch) {
        logger.info(`Invalid password for user: ${email}`);
        throw new BadRequestError("Invalid Credentials");
    }
    return user;
};

const FindUserByEmail = async (email: string) => {
    const existingUser = await findByEmailDAO(email);
    return existingUser;
};

export { VerifyCredentials, FindUserByEmail };

import { BadRequestError } from "@pinkelgrg/app-common";
import { UserAttributes } from "../../models/user";
import { CreateUserDAO } from "../../dao/user/sign-up";
import { findByEmailDAO } from "../../dao/user/find";
import { Password } from "../../utils/password";

/*
    checks if user exists:
        if exists: returns BadRequestError
    Hash users password
    Set password as hashed Password
    Create user
*/
const CreateUserService = async (user: UserAttributes) => {
    const existingUser = await findByEmailDAO(user.email);
    if (!existingUser) {
        const hashedPassword = await Password.hash(user.password);
        return CreateUserDAO({
            ...user,
            password: hashedPassword
        });
    }
    throw new BadRequestError(`User with ${user.email} already exists`);
};

export { CreateUserService };

import { User, UserAttributes } from "../../models/user";

const CreateUserDAO = async (user: UserAttributes) => {
    const newUser = await User.create(user);
    return newUser;
};

export { CreateUserDAO };

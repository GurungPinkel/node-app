import { User, UserAttributes } from "../../models/user";

const CreateUserDAO = async (user: UserAttributes) => {
    return User.create(user);
};

export { CreateUserDAO };

import { IUserAttributes, User } from "../../models/user";
import { Password } from "../../utils/password";

const CreateUser = async (user: IUserAttributes) => {
    try {
        user.password = await Password.hash(user.password);
        return await User.create(user);
    } catch (err) {
        throw err;
    }
};

export { CreateUser };

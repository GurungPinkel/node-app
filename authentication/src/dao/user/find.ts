import { User } from "../../models/user";

export const findByEmailDAO = async (email: string) => {
    const user = await User.findOne({ where: { email } });
    return user;
};

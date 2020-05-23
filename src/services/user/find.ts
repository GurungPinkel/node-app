import { User } from "../../models/user";

export const FindById = async (id: string) => {
    const user = await User.findByPk(id);
    return user;
};

export const FindByEmail = async (email: string) => {
    const user = await User.findOne({ where: { email } });
    return user;
};

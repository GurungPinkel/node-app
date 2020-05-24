import { User } from "../../models/user";

export const findByIdDAO = async (id: number) => {
    return User.findByPk(id);
};

export const findByEmailDAO = async (email: string) => {
    return User.findOne({ where: { email } });
};

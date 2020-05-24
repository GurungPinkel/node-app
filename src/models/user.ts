import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize";

export interface UserAttributes {
    id?: number;
    email: string;
    password: string;
    isActive: boolean;
}

class User extends Model {}

User.init(
    {
        email: {
            type: DataTypes.STRING,
            field: "EMAIL"
        },
        password: {
            type: DataTypes.STRING,
            field: "PASSWORD"
        },
        isActive: {
            type: DataTypes.STRING,
            field: "IS_ACTIVE"
        }
    },
    {
        tableName: "USERS",
        sequelize
    }
);

export { User };

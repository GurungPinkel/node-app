import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize";

export interface UserAttributes {
    id?: number;
    firstName: string;
    middleName?: string | null;
    lastName?: string | null;
    email: string;
    password?: string | null;
    authenticationTypeId: number;
    thirdPartyUserId?: string | null;
    dateOfBirth: Date;
    isActive: boolean;
}

class User extends Model {}

User.init(
    {
        firstName: {
            type: DataTypes.STRING,
            field: "FIRST_NAME"
        },
        middleName: {
            type: DataTypes.STRING,
            field: "MIDDLE_NAME"
        },
        lastName: {
            type: DataTypes.STRING,
            field: "LAST_NAME"
        },
        email: {
            type: DataTypes.STRING,
            field: "EMAIL"
        },
        password: {
            type: DataTypes.STRING,
            field: "PASSWORD"
        },
        authenticationTypeId: {
            type: DataTypes.NUMBER,
            field: "AUTHENTICATION_TYPE_ID"
        },
        thirdPartyUserId: {
            type: DataTypes.STRING,
            field: "THIRD_PARTY_USER_ID"
        },
        dateOfBirth: {
            type: DataTypes.DATE,
            field: "DATE_OF_BIRTH"
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            field: "IS_ACTIVE"
        }
    },
    {
        tableName: "USERS",
        sequelize
    }
);

export { User };

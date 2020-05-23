import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize";

export interface IUserAttributes {
    id?: number;
    email: string;
    password: string;
}

export interface IStrippedUserAttributes {
    id?: number;
    email: string;
}

class User extends Model {
    public id!: number;
    public email!: string;
    public password!: string;
    public authenticationType!: number;

    get user(): IUserAttributes {
        return {
            id: this.getDataValue("id"),
            email: this.getDataValue("email"),
            password: this.getDataValue("password")
        };
    }

    get strippedUserData(): IStrippedUserAttributes {
        return {
            id: this.getDataValue("id"),
            email: this.getDataValue("email")
        };
    }

    get userPassword() {
        return this.getDataValue("password");
    }
}

User.init(
    {
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: "USERS",
        sequelize
    }
);

export { User };
// import mongoose, { Schema } from "mongoose";
// import { Password } from "../utils/password";

// // interface used for creating a new user
// export interface UserAttributes {
//     email: string;
//     password: string;
//     authenticationType: number;
// }

// // interface to add create Method to UserModel
// interface UserModel extends mongoose.Model<UserDoc> {
//     build(attributes: UserAttributes): UserDoc;
// }

// // interface to describe what an existing user has
// export interface UserDoc extends mongoose.Document {
//     email: string;
//     password: string;
//     authenticationType: number;
// }

// const userSchema = new Schema(
//     {
//         email: {
//             type: String,
//             required: true,
//             unique: true
//         },
//         password: {
//             type: String,
//             minlength: 4,
//             required: true
//         },
//         authenticationType: {
//             type: Number,
//             required: true
//         }
//     },
//     {
//         toJSON: {
//             transform(doc, ret) {
//                 ret.id = ret._id;
//                 delete ret._id;
//                 delete ret.password;
//                 delete ret.__v;
//                 delete ret.authenticationType;
//             }
//         }
//     }
// );

// userSchema.pre("save", async function (done) {
//     if (this.isModified("password")) {
//         const hashed = await Password.hash(this.get("password"));
//         this.set("password", hashed);
//         done();
//     }
// });

// userSchema.statics.build = (attributes: UserAttributes) => {
//     return new User(attributes);
// };

// const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

// export default User;

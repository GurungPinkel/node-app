import jwt from "jsonwebtoken";
import { UserAttributes } from "../models/user";

export const GenerateJWT = (user: UserAttributes) => {
    // create token
    const { id, email, firstName, middleName, lastName } = user;
    const nameArray = [firstName, middleName, lastName].filter((name) => {
        return typeof name !== "undefined" && name !== null;
    });
    const userJwt = jwt.sign(
        {
            id,
            email,
            name: nameArray.join(" ")
        },
        process.env.JWT_KEY!
    );
    return userJwt;
};

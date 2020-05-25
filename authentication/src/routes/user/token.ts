import jwt from "jsonwebtoken";

export const generateJWT = (id: string, email: string) => {
    // create token
    const userJwt = jwt.sign(
        {
            id,
            email
        },
        process.env.JWT_KEY!
    );
    return userJwt;
};

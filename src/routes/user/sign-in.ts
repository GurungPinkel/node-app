import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { ValidateRequest } from "@pinkelgrg/app-common";
import { VerifyCredentials } from "../../service/user/sign-in";
import { generateJWT } from "./token";
import { logger } from "../../config/winston";

const router = express.Router();

/*
    Param:
        email:string
        password: string
*/
const SignInRouter = router.post(
    "/api/user/signin",
    [
        body("email")
            .exists()
            .withMessage("Invalid Email! Email must be provided")
            .trim()
            .isEmail()
            .normalizeEmail()
            .withMessage("Invalid Email! Please provide a valid email"),

        body("password")
            .exists()
            .withMessage("Invalid Password! Password must be provied")
            .trim()
            .isLength({ min: 8, max: 20 })
            .withMessage("Invalid Password! Password must be between 8-20 characters")
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/)
            .withMessage(
                "Invalid Password! Password must contain atleast 1 special character and 1 number"
            )
    ],
    ValidateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        try {
            const user = await VerifyCredentials(email, password);
            const { id } = user;
            const userJwt = generateJWT(id, email);
            req.session = {
                jwt: userJwt
            };

            logger.debug(`User loggedIn!: ${email}`);
            return res.status(200).send({ id, email });
        } catch (err) {
            return next(err);
        }
    }
);

export { SignInRouter };

import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { ValidateRequest } from "@pinkelgrg/app-common";
import { CreateUserService } from "../../service/user/sign-up";
import { logger } from "../../config/winston";

const router = express.Router();

/*
    @param
    email: string
    password: string
*/
const SignUpRouter = router.post(
    "/api/user/signup",
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
            const user = await CreateUserService({ email, password, isActive: true });
            const { id } = user;

            // create token
            const userJwt = jwt.sign(
                {
                    id,
                    email
                },
                process.env.JWT_KEY!
            );

            // add token as cookie
            req.session = {
                jwt: userJwt
            };
            logger.debug(`New User Created!: ${email}`);
            return res.status(201).send({ id, email });
        } catch (err) {
            return next(err);
        }
    }
);

export { SignUpRouter };

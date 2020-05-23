import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { ValidateRequest, BadRequestError } from "@pinkelgrg/app-common";
import { FindByEmail } from "../../services/user/find";
import { CreateUser } from "../../services/user/create";
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
            // check if user exists
            const isUser = await FindByEmail(email);
            if (isUser) {
                logger.debug(`User already exists - ${isUser.email}`);
                return next(new BadRequestError("User already exists"));
            }
            const user = await CreateUser({ email, password });

            // create token
            const userJwt = jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                process.env.JWT_KEY!
            );
            // add token as cookie
            req.session = {
                jwt: userJwt
            };

            const { id } = user;
            logger.debug(`New User Created!: ${email}`);
            return res.status(201).send({ id, email });
        } catch (err) {
            logger.error(err);
            return next(err);
        }
    }
);

export default SignUpRouter;

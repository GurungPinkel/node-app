import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { ValidateRequest } from "@pinkelgrg/app-common";
import { CreateUserService } from "../../service/user/sign-up";
import { GenerateJWT } from "../../utils/jwtToken";
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
        body("firstname")
            .exists()
            .withMessage("Invalid First Name! First Name must be provided")
            .trim()
            .isLength({ min: 1, max: 30 })
            .withMessage(
                "Invalid First Name!. First Name cannot exceed 30 characters in length"
            ),
        body("middlename")
            .trim()
            .isLength({ max: 30 })
            .withMessage(
                "Invalid Middle Name!. Middle Name cannot exceed 30 characters in length"
            ),
        body("lastname")
            .trim()
            .isLength({ max: 30 })
            .withMessage(
                "Invalid Last Name!. Last Name cannot exceed 30 characters in length"
            ),
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
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,20}$/
            )
            .withMessage(
                "Invalid Password! Password must contain atleast 1 special character and 1 number"
            ),
        body("dateofbirth")
            .exists()
            .withMessage("Invalid Date of Birth! Date of Birth must be provied")
            .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)
            .withMessage("Invalid Date of Birth")
    ],
    ValidateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
        const {
            email,
            password,
            dateofbirth,
            firstname,
            middlename,
            lastname
        } = req.body;
        try {
            const user = await CreateUserService({
                authenticationTypeId: 1,
                dateOfBirth: dateofbirth,
                email,
                firstName: firstname,
                middleName: middlename || null,
                lastName: lastname || null,
                isActive: true,
                password,
                thirdPartyUserId: null
            });
            const { id } = user;

            // get token
            const userJwt = GenerateJWT(user);

            // add token as cookie
            req.session = {
                jwt: userJwt
            };

            logger.debug(`New User Created!: ${email}`);
            return res.status(201).send({ id, email });
        } catch (err) {
            logger.debug(err);
            return next(err);
        }
    }
);

export { SignUpRouter };

import express, { Request, Response, NextFunction } from "express";
import { body, query } from "express-validator";
import fetch from "node-fetch";
import { ValidateRequest, BadRequestError } from "@pinkelgrg/app-common";
import { VerifyCredentials, FindUserByEmail } from "../../service/user/sign-in";
import { CreateUserService } from "../../service/user/sign-up";
import { GenerateJWT } from "../../utils/jwtToken";
import { logger } from "../../config/winston";

const router = express.Router();

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
            const { id, isActive } = user;

            // if user is not active:
            if (!isActive) {
                return next(new BadRequestError("This account has been disabled!"));
            }
            const userJwt = GenerateJWT(id, email);
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

const FacebookSignInRouter = router.get(
    "/api/user/facebook/callback",
    [query("code").exists().notEmpty().withMessage("Unable to login using facebook")],
    ValidateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
        const { code } = req.query;
        if (typeof code === "undefined" || code === null) {
            return next(new BadRequestError("Unable to login using facebook"));
        }

        try {
            const facebookToken = await GetFacebookToken(code.toString());
            const { access_token } = facebookToken;
            if (!access_token) {
                return res.redirect(
                    `/signin?error=${encodeURIComponent("Unable to login with facebook")}`
                );
            }
            const fbUser = await GetFacebookUserProfile(access_token);

            const { id, first_name, middle_name, last_name, email } = fbUser;
            if (!email) {
                return res.redirect(
                    `/signin?error=${encodeURIComponent("Unable to login with facebook")}`
                );
            }

            const existingUser = await FindUserByEmail(email);
            if (!existingUser) {
                const user = await CreateUserService({
                    authenticationTypeId: 2,
                    dateOfBirth: new Date("1975-05-13"), // TODO hardcoded date- needs review from facebook app so use hardcoded for now.
                    email: email,
                    firstName: first_name,
                    middleName: middle_name || null,
                    lastName: last_name || null,
                    isActive: true,
                    password: null,
                    thirdPartyUserId: id
                });
                const userJwt = GenerateJWT(user.id, email);
                req.session = {
                    jwt: userJwt
                };
                return res.redirect("/demo");
            }

            const userJwt = GenerateJWT(existingUser.id, email);

            req.session = {
                jwt: userJwt
            };
            return res.redirect("/");
        } catch (err) {
            logger.error("[FacebookSignInRouter] : ", err);
            return res.redirect(
                `/signin?error=${encodeURIComponent("Unable to login with facebook")}`
            );
        }
    }
);

const GetFacebookUserProfile = async (token: string) => {
    const url = `${process.env.FACEBOOK_GET_PROFILE_HOST}?fields=${process.env.FACEBOOK_PROFILE_FIELDS}&access_token=${token}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
};

const GetFacebookToken = async (code: string) => {
    const url = `${process.env.FACEBOOK_GET_TOKEN_HOST}?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URL}&client_secret=${process.env.FACEBOOK_LOGIN_SECRET}&code=${code}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
};

export { SignInRouter, FacebookSignInRouter, GetFacebookUserProfile, GetFacebookToken };

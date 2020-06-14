/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable import/first */
import fetch from "jest-fetch-mock";

jest.setMock("node-fetch", fetch);
import request from "supertest";
import * as findUser from "../../../service/user/sign-in";
import * as createUser from "../../../service/user/sign-up";
import app from "../../../app";

beforeEach(() => {
    jest.clearAllMocks();
    fetch.resetMocks();
});

afterEach(() => {
    fetch.mockRestore();
});
describe("SignInRouter", () => {
    it("should not set token and return status 400 if user does not exist", async () => {
        const response = await request(app)
            .post("/api/user/signin")
            .send({ email: "random@mail.com", password: "pass123!@#" })
            .expect(400);
        expect(response.get("Set-Cookie")).toBeUndefined();
    });
    it("should not set token and return status 400 if password is invalid", async () => {
        const response = await request(app)
            .post("/api/user/signin")
            .send({ email: "signintest@user.com", password: "pass123!@#" })
            .expect(400);
        expect(response.get("Set-Cookie")).toBeUndefined();
    });

    it("should return status 400 if user is not active", async () => {
        await request(app)
            .post("/api/user/signup")
            .send({
                email: "signintest@user.com",
                password: "useL@stP@55",
                firstname: "firstname",
                middlename: "middename",
                lastname: "lastname",
                dateofbirth: "1993-01-07"
            })
            .expect(201);

        const response = await request(app)
            .post("/api/user/signin")
            .send({ email: "signintest@user.com", password: "useL@stP@55" })
            .expect(302);
        expect(response.get("Set-Cookie")).toBeDefined();
    });

    it("should return status 400 if password is incorrect", async () => {
        await request(app)
            .post("/api/user/signup")
            .send({
                email: "signintest@user.com",
                password: "useL@stP@55",
                firstname: "firstname",
                middlename: "middename",
                lastname: "lastname",
                dateofbirth: "1993-01-07"
            })
            .expect(201);

        const response = await request(app)
            .post("/api/user/signin")
            .send({ email: "signintest@user.com", password: "useL@stP@5" })
            .expect(400);
        expect(response.get("Set-Cookie")).not.toBeDefined();
        expect(response.body.errors[0].message).toEqual("Invalid Credentials");
    });

    it("should return status 200 if user successfully logs in", async () => {
        await request(app)
            .post("/api/user/signup")
            .send({
                email: "signintest@user.com",
                password: "useL@stP@55",
                firstname: "firstname",
                middlename: "middename",
                lastname: "lastname",
                dateofbirth: "1993-01-07"
            })
            .expect(201);

        const response = await request(app)
            .post("/api/user/signin")
            .send({ email: "signintest@user.com", password: "useL@stP@55" })
            .expect(302);
        expect(response.get("Set-Cookie")).toBeDefined();
    });
});

describe("FacebookSignInRouter", () => {
    it("should throw an error if facebook sign in callback does not have a code in the query param", async () => {
        await request(app).get("/api/user/facebook/callback").expect(400);
    });

    it("should redirect to login page if we cannot get facebook token", async () => {
        fetch.mockIf(
            `${process.env.FACEBOOK_GET_TOKEN_HOST}?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URL}&client_secret=${process.env.FACEBOOK_LOGIN_SECRET}&code=randomcode`,
            //
            JSON.stringify({ access_token: null })
        );
        await request(app)
            .get("/api/user/facebook/callback?code=randomcode")
            .expect(
                `Location`,
                `/signin?error=${encodeURIComponent("Unable to login with facebook")}`
            )
            .expect(302);
    });

    it("should redirect to login page if we cannot get user information via facebook ", async () => {
        const fakeToken = "randomFakeT0k3n";
        const fakeCode = "randomFakeCode";

        fetch.mockOnceIf(
            `${process.env.FACEBOOK_GET_TOKEN_HOST}?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URL}&client_secret=${process.env.FACEBOOK_LOGIN_SECRET}&code=${fakeCode}`,
            //
            JSON.stringify({ access_token: fakeToken })
        );

        fetch.mockOnceIf(
            `${process.env.FACEBOOK_GET_PROFILE_HOST}?fields=${process.env.FACEBOOK_PROFILE_FIELDS}&access_token=${fakeToken}`,
            //
            JSON.stringify({})
        );

        await request(app)
            .get(`/api/user/facebook/callback?code=${fakeCode}`)
            .expect(
                `Location`,
                `/signin?error=${encodeURIComponent(
                    "Unable to login. Email not provided"
                )}`
            )
            .expect(302);
    });

    it("should create a user with data from facebook if a user does not exists", async () => {
        const fakeToken = "randomFakeT0k3n";
        const fakeCode = "randomFakeCode";

        fetch.mockOnceIf(
            `${process.env.FACEBOOK_GET_TOKEN_HOST}?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URL}&client_secret=${process.env.FACEBOOK_LOGIN_SECRET}&code=${fakeCode}`,
            //
            JSON.stringify({ access_token: fakeToken })
        );

        fetch.mockOnceIf(
            `${process.env.FACEBOOK_GET_PROFILE_HOST}?fields=${process.env.FACEBOOK_PROFILE_FIELDS}&access_token=${fakeToken}`,
            //
            JSON.stringify({
                id: 12345,
                first_name: "pinkel",
                middle_name: "",
                last_name: "gurung",
                email: "pinkelgrg@hotmail.com"
            })
        );
        jest.spyOn(findUser, "FindUserByEmail");
        jest.spyOn(createUser, "CreateUserService");

        const response = await request(app)
            .get(`/api/user/facebook/callback?code=${fakeCode}`)
            .expect("Location", "/")
            .expect(302);
        expect(response.get("Set-Cookie")).toBeDefined();
        expect(findUser.FindUserByEmail).toHaveBeenCalledTimes(1);
        expect(createUser.CreateUserService).toHaveBeenCalledTimes(1);
    });

    it("should not create a user with data from facebook if a user already exists", async () => {
        const fakeToken = "randomFakeT0k3n";
        const fakeCode = "randomFakeCode";

        fetch.mockOnceIf(
            `${process.env.FACEBOOK_GET_TOKEN_HOST}?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URL}&client_secret=${process.env.FACEBOOK_LOGIN_SECRET}&code=${fakeCode}`,
            //
            JSON.stringify({ access_token: fakeToken })
        );

        fetch.mockOnceIf(
            `${process.env.FACEBOOK_GET_PROFILE_HOST}?fields=${process.env.FACEBOOK_PROFILE_FIELDS}&access_token=${fakeToken}`,
            //
            JSON.stringify({
                id: 12345,
                first_name: "pinkel",
                middle_name: "",
                last_name: "gurung",
                email: "pinkelgrg@hotmail.com"
            })
        );
        const findUserMock = jest.spyOn(findUser, "FindUserByEmail");
        findUserMock.mockReturnValue(
            new Promise((resolve) => {
                return resolve({
                    id: 12345,
                    first_name: "pinkel",
                    middle_name: "",
                    last_name: "gurung",
                    email: "pinkelgrg@hotmail.com"
                });
            })
        );
        const createUserMock = jest.spyOn(createUser, "CreateUserService");
        createUserMock.mockReturnValue(
            new Promise((resolve) => {
                return resolve(JSON.stringify({ id: 12312312 }));
            })
        );

        const response = await request(app)
            .get(`/api/user/facebook/callback?code=${fakeCode}`)
            .expect("Location", "/")
            .expect(302);
        expect(response.get("Set-Cookie")).toBeDefined();
        expect(findUser.FindUserByEmail).toHaveBeenCalledTimes(1);
        expect(createUser.CreateUserService).not.toHaveBeenCalled();
    });
});

it("should catch any exception while signing up with facebook", async () => {
    jest.mock("../sign-in", () => {
        const originalModule = jest.requireActual("../service/user/sign-in");
        return {
            __esModule: true, // Use it when dealing with esModules
            ...originalModule,
            GetFacebookToken: jest.fn(() => {
                throw new Error("Errrr");
            })
        };
    });

    const response = await request(app)
        .get(`/api/user/facebook/callback?code=randomFakeCode`)
        .expect(
            "Location",
            `/signin?error=${encodeURIComponent(
                "An error occured while trying to authenticate with facebook"
            )}`
        )
        .expect(302);
    expect(response.get("Set-Cookie")).not.toBeDefined();
});

// TODO: add test case for inactive user.

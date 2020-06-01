import request from "supertest";
import app from "../../../app";

// create a valid user

describe("sign in with invalid credentials", () => {
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
});

describe("sign in with valid credentials", () => {
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
            .expect(200);
        expect(response.get("Set-Cookie")).toBeDefined();
    });
});

// TODO: add test case for inactive user.

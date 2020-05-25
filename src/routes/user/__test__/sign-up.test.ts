import request from "supertest";
import app from "../../../app";

describe("sign up", () => {
    it("should return status 400 if email or password is invalid", async () => {
        const invalidEmailsList = [
            "",
            "mail",
            "mail@m",
            "mail@ma.",
            "mail@mail.123",
            "mail@mail.com"
        ];

        // valid password must be 8-20 characters long and it must have atleast 1 number and 1 special character
        const invalidPasswordsList = [
            "",
            "2Short!",
            "noNumbers!",
            "NoSpec1alChars",
            "onlytext",
            "123456789",
            "123456!@#$%^",
            "myVeryLongPasswordThatExceeds20CharactersAndAlsoH@sSpec!@lCh@r@cters"
        ];
        const invalidRequests = [];
        for (let i = 0; i < invalidEmailsList.length; i += 1) {
            for (let j = 0; j < invalidPasswordsList.length; j += 1) {
                invalidRequests.push(
                    request(app)
                        .post("/api/user/signup")
                        .send({
                            email: invalidEmailsList[i],
                            password: invalidPasswordsList[j]
                        })
                        .expect(400)
                );
            }
        }
        await Promise.all(invalidRequests);

        await request(app).post("/api/user/signup").send({}).expect(400);
        await request(app)
            .post("/api/user/signup")
            .send({
                email: "myvalid@email.com"
            })
            .expect(400);

        await request(app)
            .post("/api/user/signup")
            .send({
                password: "v@lidpassw0rd"
            })
            .expect(400);
    });
    it("should assign cookie with token when user is created", async () => {
        const response = await request(app)
            .post("/api/user/signup")
            .send({
                email: "mails@hotmail.com",
                password: "abcdef1!"
            })
            .expect(201);

        expect(response.get("Set-Cookie")).toBeDefined();
    });

    it("should not assign cookie with token when user is not created", async () => {
        const response = await request(app)
            .post("/api/user/signup")
            .send({
                password: "abcdef1!"
            })
            .expect(400);

        expect(response.get("Set-Cookie")).toBeUndefined();
    });

    it("should return status 201 when user are created", async () => {
        await request(app)
            .post("/api/user/signup")
            .send({
                email: "mail@hotmail.com",
                password: "abcdef1!"
            })
            .expect(201);
        await request(app)
            .post("/api/user/signup")
            .send({
                email: "mail@yahoo.com",
                password: "!@#$%^1a"
            })
            .expect(201);
        await request(app)
            .post("/api/user/signup")
            .send({
                email: "mail@webmail.com",
                password: "p@ssw0rdlengthis20!"
            })
            .expect(201);
        await request(app)
            .post("/api/user/signup")
            .send({
                email: "mail@googlemail.com",
                password: "s0m3R@nD0m"
            })
            .expect(201);
        await request(app)
            .post("/api/user/signup")
            .send({
                email: "mail@msn.com",
                password: "mypass123!"
            })
            .expect(201);
        await request(app)
            .post("/api/user/signup")
            .send({
                email: "mail@company.com",
                password: "useL@stP@55"
            })
            .expect(201);
    });

    it("should not create a user with an existing email", async () => {
        // should be able to create a user with email user@user.com
        await request(app)
            .post("/api/user/signup")
            .send({
                email: "user@user.com",
                password: "useL@stP@55"
            })
            .expect(201);

        // Since user with email user@user.com was created earlier, this should fail.
        await request(app)
            .post("/api/user/signup")
            .send({
                email: "user@user.com",
                password: "useL@stP@55"
            })
            .expect(400);
    });
});

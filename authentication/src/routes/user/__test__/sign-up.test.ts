import request from "supertest";
import app from "../../../app";

describe("sign up", () => {
    it("should return status 400 if email is invalid", async () => {
        const invalidEmailsList = [
            "",
            "mail @ mail.com",
            "mail",
            "mail@m",
            "mail@ma.",
            "mail@mail.123",
            "mail@mailcom"
        ];
        const invalidRequests = [];

        for (let i = 0; i < invalidEmailsList.length; i += 1) {
            invalidRequests.push(
                request(app)
                    .post("/api/user/signup")
                    .send({
                        email: invalidEmailsList[i],
                        password: "myfak3p@ssw0rd",
                        firstname: "Firstname",
                        middlename: "Middename",
                        lastname: "Lastname",
                        dateofbirth: "1993-01-07"
                    })
                    .expect(400)
            );
        }
        await Promise.all(invalidRequests);

        await request(app)
            .post("/api/user/signup")
            .send({
                password: "myfak3p@ssw0rd",
                firstname: "Firstname",
                middlename: "Middename",
                lastname: "Lastname",
                dateofbirth: "1993-01-07"
            })
            .expect(400);
    });

    it("should return status 400 if password is invalid", async () => {
        const invalidPasswordList = [
            "",
            "mypassword",
            "myp@ssword",
            "mypassw0rd",
            "P@55w0#",
            "Very10ngP@ssw0rdWhichExceedsTheThresholdl3ngth"
        ];
        const invalidRequests = [];

        for (let i = 0; i < invalidPasswordList.length; i += 1) {
            invalidRequests.push(
                request(app)
                    .post("/api/user/signup")
                    .send({
                        password: invalidPasswordList[i],
                        email: "user@usermail.com",
                        firstname: "Firstname",
                        middlename: "Middename",
                        lastname: "Lastname",
                        dateofbirth: "1993-01-07"
                    })
                    .expect(400)
            );
        }
        await Promise.all(invalidRequests);

        await request(app)
            .post("/api/user/signup")
            .send({
                email: "user@usermail.com",
                firstname: "Firstname",
                middlename: "Middename",
                lastname: "Lastname",
                dateofbirth: "1993-01-07"
            })
            .expect(400);
    });

    it("should return status 400 if password is invalid", async () => {
        const invalidPasswordList = [
            "",
            "mypassword",
            "myp@ssword",
            "mypassw0rd",
            "P@55w0#",
            "Very10ngP@ssw0rdWhichExceedsTheThresholdl3ngth"
        ];
        const invalidRequests = [];

        for (let i = 0; i < invalidPasswordList.length; i += 1) {
            invalidRequests.push(
                request(app)
                    .post("/api/user/signup")
                    .send({
                        password: invalidPasswordList[i],
                        email: "user@usermail.com",
                        firstname: "Firstname",
                        middlename: "Middename",
                        lastname: "Lastname",
                        dateofbirth: "1993-01-07"
                    })
                    .expect(400)
            );
        }
        await Promise.all(invalidRequests);

        await request(app)
            .post("/api/user/signup")
            .send({
                email: "user@usermail.com",
                firstname: "Firstname",
                middlename: "Middename",
                lastname: "Lastname",
                dateofbirth: "1993-01-07"
            })
            .expect(400);
    });

    it("should return status 400 if first name is invalid", async () => {
        const invalidFirstNameList = [
            "",
            "     ",
            null,
            "Very10ngFirstNameWhichExceedsTheThresholdl3ngth"
        ];
        const invalidRequests = [];

        for (let i = 0; i < invalidFirstNameList.length; i += 1) {
            invalidRequests.push(
                request(app)
                    .post("/api/user/signup")
                    .send({
                        password: "myfak3p@ssw0rd",
                        email: "user@usermail.com",
                        firstname: invalidFirstNameList[i],
                        middlename: "Middename",
                        lastname: "Lastname",
                        dateofbirth: "1993-01-07"
                    })
                    .expect(400)
            );
        }
        await Promise.all(invalidRequests);

        await request(app)
            .post("/api/user/signup")
            .send({
                password: "myfak3p@ssw0rd",
                email: "user@usermail.com",
                middlename: "Middename",
                lastname: "Lastname",
                dateofbirth: "1993-01-07"
            })
            .expect(400);
    });

    it("should return status 400 if date of birth is not invalid date", async () => {
        const invalidDateFormatList = [
            "",
            "     ",
            null,
            "Random string",
            "2020",
            "2020-00-014",
            "2020-00-00",
            "2020-15-15"
        ];
        const invalidRequests = [];

        for (let i = 0; i < invalidDateFormatList.length; i += 1) {
            invalidRequests.push(
                request(app)
                    .post("/api/user/signup")
                    .send({
                        password: "myfak3p@ssw0rd",
                        email: "user@usermail.com",
                        dateofbirth: invalidDateFormatList[i],
                        middlename: "Middename",
                        lastname: "Lastname",
                        firstname: "Firstname"
                    })
                    .expect(400)
            );
        }
        await Promise.all(invalidRequests);

        await request(app)
            .post("/api/user/signup")
            .send({
                firstname: "Firstname",
                password: "myfak3p@ssw0rd",
                email: "user@usermail.com",
                middlename: "Middename",
                lastname: "Lastname"
            })
            .expect(400);
    });

    it("should assign cookie with token when user is created", async () => {
        const response = await request(app)
            .post("/api/user/signup")
            .send({
                password: "myfak3p@ssw0rd",
                email: "user@usermail.com",
                dateofbirth: "1993-01-08",
                middlename: "Middename",
                lastname: "Lastname",
                firstname: "Firstname"
            })
            .expect(201);

        expect(response.get("Set-Cookie")).toBeDefined();
    });

    it("should not assign cookie with token when user is not created", async () => {
        const response = await request(app)
            .post("/api/user/signup")
            .send({
                email: "user@usermail.com",
                password: "myfak3p@ssw0rd",
                middlename: "Middename",
                lastname: "Lastname",
                dateofbirth: "1993-01-08"
            })
            .expect(400);

        expect(response.get("Set-Cookie")).toBeUndefined();
    });

    it("should return status 201 when user are created - Middle Name and Last Name are optional", async () => {
        await request(app)
            .post("/api/user/signup")
            .send({
                email: "user@usermail.com",
                password: "myfak3p@ssw0rd",
                firstname: "Firstname",
                middlename: "Middename",
                lastname: "Lastname",
                dateofbirth: "1993-01-08"
            })
            .expect(201);
        await request(app)
            .post("/api/user/signup")
            .send({
                email: "user2@usermail.com",
                password: "myfak3p@ssw0rd",
                firstname: "Firstname",
                middlename: "Middename",
                lastname: "Lastname",
                dateofbirth: "1993-01-08"
            })
            .expect(201);
        await request(app)
            .post("/api/user/signup")
            .send({
                email: "user3@usermail.com",
                password: "myfak3p@ssw0rd",
                firstname: "Firstname",
                middlename: "Middename",
                dateofbirth: "1993-01-08"
            })
            .expect(201);
        await request(app)
            .post("/api/user/signup")
            .send({
                email: "user4@usermail.com",
                password: "myfak3p@ssw0rd",
                firstname: "Firstname",
                lastname: "Lastname",
                dateofbirth: "1790-01-08"
            })
            .expect(201);
        await request(app)
            .post("/api/user/signup")
            .send({
                email: "user5@usermail.com",
                password: "myfak3p@ssw0rd",
                firstname: "Firstname",
                dateofbirth: "1940-01-08"
            })
            .expect(201);
    });

    it("should not create a user with an existing email", async () => {
        // should be able to create a user with email user@user.com
        await request(app)
            .post("/api/user/signup")
            .send({
                email: "user@usermail.com",
                password: "myfak3p@ssw0rd",
                firstname: "Firstname",
                dateofbirth: "1993-01-08"
            })
            .expect(201);

        // Since user with email user@user.com was created earlier, this should fail.
        await request(app)
            .post("/api/user/signup")
            .send({
                email: "user@usermail.com",
                password: "myfak3p@ssw0rd",
                firstname: "Firstname",
                dateofbirth: "1993-01-08"
            })
            .expect(400);
    });
});

import request from "supertest";
import app from "../../../app";

it("should clear the cookie when user signs out", async () => {
    // create user first
    await request(app)
        .post("/api/user/signup")
        .send({
            email: "mails@hotmail.com",
            password: "abcdef1!"
        })
        .expect(201);

    // successfully sign in with that user and verify cookie exists.

    const signin = await request(app)
        .post("/api/user/signin")
        .send({ email: "mails@hotmail.com", password: "abcdef1!" })
        .expect(200);
    expect(signin.get("Set-Cookie")).toBeDefined();

    // signout to confirm that cookie was removed.
    const signout = await request(app).post("/api/user/signout").send({}).expect(200);
    expect(signout.get("Set-Cookie")[0]).toEqual(
        "express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
    );
});

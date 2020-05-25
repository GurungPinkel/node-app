import request from "supertest";
import app from "../app";

jest.mock("../service/user/sign-in", () => {
    // Require the original module to not be mocked...
    const originalModule = jest.requireActual("../service/user/sign-in");

    return {
        __esModule: true, // Use it when dealing with esModules
        ...originalModule,
        VerifyCredentials: jest.fn(() => {
            throw new Error("Errrr");
        })
    };
});

afterAll(() => {
    jest.clearAllMocks();
});

it("should return a status 404 ", async () => {
    await request(app).get("/random/path").expect(404);
});

it("should catch and handle exception", async () => {
    await request(app)
        .post("/api/user/signin")
        .send({ email: "somevalidemail@mail.com", password: "som3V@lidPass" })
        .expect(500);
});

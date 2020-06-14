import request from "supertest";
import app from "../../../app";

it("should return null if user is not authenticated", async () => {
    await request(app).get("/api/user/currentuser").expect(200);
});

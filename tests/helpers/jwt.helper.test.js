import { expect } from "@jest/globals";
import { generateToken, verifyToken } from "../../src/helpers/jwt.helper.js";
import { sign } from "jsonwebtoken";

describe("Helpers: jwt", () => {

    const data = {
        userId: "userid"
    }

    it("Generate token", async () => {
        const result = generateToken({ data });

        expect(result).not.toBeUndefined();
        expect(result).toContain("ey")
    });

    it("Verify token", async () => {
        const token = generateToken({ data });

        const result = verifyToken(token);

        expect(result).not.toBeUndefined();
        expect(result.userId).toBe(data.userId);
    });
});

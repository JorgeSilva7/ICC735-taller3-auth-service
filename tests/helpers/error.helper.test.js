import getMe from "../../src/controllers/get-me.controller.js";
import { expect, jest } from "@jest/globals";
import * as GetById from "../../src/logic/get-by-id.logic.js";
import { HTTPError, returnErrorResponse } from "../../src/helpers/error.helper.js";
import { JsonWebTokenError } from "jsonwebtoken";

describe("Helpers: error", () => {

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    it("Return 400 HTTPError response", async () => {
        const error = new HTTPError({ name: "name", msg: "msg", code: 400 })

        returnErrorResponse(error, res);

        expect(res.status).toBeCalledWith(error.statusCode);
        expect(res.json).toBeCalledWith({ error: { ...error } });
    });

    it("Return 403 JWTError response", async () => {
        const error = new JsonWebTokenError("message")

        const jwtError = new HTTPError({
			name: error.name,
			msg: error.message,
			code: 403,
		});

        returnErrorResponse(error, res);

        expect(res.status).toBeCalledWith(jwtError.statusCode);
        expect(res.json).toBeCalledWith({ error: { ...jwtError } });
    });
});

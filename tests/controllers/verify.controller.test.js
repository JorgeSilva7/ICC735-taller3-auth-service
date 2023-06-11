import verify from "../../src/controllers/verify.controller.js";
import { expect, jest } from "@jest/globals";
import * as VerifyLogic from "../../src/logic/verify.logic.js";
import { HTTPError } from "../../src/helpers/error.helper.js";
import verifyMessages from "../../src/messages/verify.messages.js";

describe("Controller: Verify", () => {
	const verifyLogicStub = jest.spyOn(VerifyLogic, "default");

	const userId = "userId";
	const defaultReq = {
		body: {
			code: "code",
		},
		userId,
	};

	const res = {
		status: jest.fn().mockReturnThis(),
		json: jest.fn(),
	};

	it("[ERROR] Should throw an error when the code doesn't exists in the body", async () => {
		const req = {
			body: {},
		};

		const httpError = new HTTPError({
			name: verifyMessages.validation.name,
			msg: verifyMessages.validation.messages.code,
			code: 400,
		});

		await verify(req, res);
		expect(res.status).toBeCalledWith(400);
		expect(res.json).toBeCalledWith({ error: { ...httpError } });
		expect(verifyLogicStub).not.toBeCalled();
	});

	it("[ERROR] Should throw an 500 error when VerifyLogic throws an TypeError", async () => {
		const error = new TypeError("some-error");

		verifyLogicStub.mockRejectedValue(error);

		await verify(defaultReq, res);

		expect(res.status).toBeCalledWith(500);
		expect(res.json).toBeCalledWith({ error: error.toString() });
		expect(verifyLogicStub).toBeCalled();
	});

	it("[ERROR] Should throw an 400 error when VerifyLogic throws an HTTPError with 400 code", async () => {
		const error = new HTTPError({
			name: verifyMessages.validation.name,
			msg: verifyMessages.validation.messages.code,
			code: 400,
		});

		verifyLogicStub.mockRejectedValue(error);

		await verify(defaultReq, res);

		expect(res.status).toBeCalledWith(400);
		expect(res.json).toBeCalledWith({ error: { ...error } });
		expect(verifyLogicStub).toBeCalled();
	});

	it("[SUCCESS] Should return a token when VerifyLogic return the success", async () => {
		verifyLogicStub.mockResolvedValue(true);

		await verify(defaultReq, res);
		expect(res.json).toBeCalledWith({ response: true });
		expect(res.status).toBeCalledWith(200);
		expect(verifyLogicStub).toBeCalledWith({
			code: defaultReq.body.code,
			userId,
		});
	});
});

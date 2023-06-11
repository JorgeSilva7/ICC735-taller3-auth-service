import getMe from "../../src/controllers/get-me.controller.js";
import { expect, jest } from "@jest/globals";
import * as GetById from "../../src/logic/get-by-id.logic.js";

describe("Controller: Get me", () => {
	const getByIdLogicStub = jest.spyOn(GetById, "default");

	const userId = "userid";
	const defaultReq = {
		userId,
	};

	const res = {
		status: jest.fn().mockReturnThis(),
		json: jest.fn(),
	};

	it("[ERROR] Should throw an 500 error when GetMeLogic throws an TypeError", async () => {
		const error = new TypeError("some-error");

		getByIdLogicStub.mockRejectedValue(error);

		await getMe(defaultReq, res);

		expect(res.status).toBeCalledWith(500);
		expect(res.json).toBeCalledWith({ error: error.toString() });
		expect(getByIdLogicStub).toBeCalled();
	});

	it("[SUCCESS] Should return a token when GetMeLogic return the success", async () => {
		const user = { name: "user" };
		getByIdLogicStub.mockResolvedValue(user);

		await getMe(defaultReq, res);
		expect(res.json).toBeCalledWith(user);
		expect(res.status).toBeCalledWith(200);
		expect(getByIdLogicStub).toBeCalledWith(userId);
	});
});

import UserModel from "../../src/models/user.model.js";
import { HTTPError } from "../../src/helpers/error.helper.js";
import getById from "../../src/logic/get-by-id.logic.js";
import UserFactory from "../factory/user.factory.js";

jest.mock("../../src/models/user.model.js", () => ({
	findById: jest.fn().mockReturnThis(),
	exec: jest.fn(),
}));

describe("Logic: get-by-id", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("[ERROR] Should throw HTTPError with user not found message if user is not found", async () => {
		const foundUser = null;
		UserModel.exec.mockResolvedValue(foundUser);

		try {
			await getById("123");
			fail("Expected HTTPError to be thrown");
		} catch (error) {
			expect(error instanceof HTTPError).toBe(true);
			expect(error.name).toBe("get_me_user_not_found_error");
			expect(error.msg).toBe("user not found");
			expect(error.statusCode).toBe(404);
			expect(UserModel.findById).toHaveBeenCalledWith("123");
			expect(UserModel.exec).toHaveBeenCalled();
		}
	});

	it("[SUCCESS] Should return a user successfully", async () => {
		const foundUser = UserFactory.build();
		UserModel.exec.mockResolvedValue(foundUser);

		const result = await getById(foundUser._id);
		expect(UserModel.findById).toHaveBeenCalledWith(foundUser._id);
		expect(UserModel.exec).toHaveBeenCalled();
		expect(result).toBe(foundUser);
	});
});

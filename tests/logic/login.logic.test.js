import login from "../../src/logic/login.logic.js";
import UserModel from "../../src/models/user.model.js";
import { HTTPError } from "../../src/helpers/error.helper.js";
import loginMessages from "../../src/messages/login.messages.js";
import { generateToken } from "../../src/helpers/jwt.helper.js";
import UserFactory from "../factory/user.factory.js";

// Mock the necessary dependencies
jest.mock("../../src/models/user.model.js");
jest.mock("../../src/helpers/jwt.helper.js");

describe("login.logic", () => {
	const invalidPasswordUserData = UserFactory.build();
	const invalidPasswordUser = {
		...invalidPasswordUserData,
		comparePassword: jest.fn(),
	};

	const blockedUserData = UserFactory.build({ blocked: true });
	const blockedUser = {
		...blockedUserData,
		comparePassword: jest.fn().mockResolvedValue(true),
	};

	const foundUserData = UserFactory.build();
	const foundUser = {
		...foundUserData,
		comparePassword: jest.fn().mockResolvedValue(true),
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("[ERROR] Should throw HTTPError if user is blocked", async () => {
		const blockedError = new HTTPError({
			name: loginMessages.blocked.name,
			msg: loginMessages.blocked.message,
			code: 403,
		});
		UserModel.findOne.mockReturnValue({
			select: jest.fn().mockReturnValue({
				exec: jest.fn().mockResolvedValue(blockedUser),
			}),
		});

		try {
			await login({ email: "test@example.com", password: "password" });
			throw new Error("unexpected error");
		} catch (error) {
			expect(error).toEqual(blockedError);
		}
	});

	it("[ERROR]Should throw HTTPError if user is not found", () => {
		const invalidCredentialsErrorMessage = "Invalid email or password";
		const invalidCredentialsError = new HTTPError({
			name: loginMessages.invalidCredentials.name,
			msg: loginMessages.invalidCredentials.message,
			code: 400,
		});

		UserModel.findOne.mockReturnValue({
			select: jest.fn().mockReturnValue({
				exec: jest.fn().mockResolvedValue(null),
			}),
		});
		loginMessages.invalidCredentials.message = invalidCredentialsErrorMessage;

		expect.assertions(2);
		return login({ email: "test@example.com", password: "password" }).catch(
			(error) => {
				expect(error).toEqual(invalidCredentialsError);
				expect(UserModel.findOne).toHaveBeenCalledWith({
					email: new RegExp(`^test@example.com$`, "i"),
				});
			}
		);
	});

	it("[ERROR] Should throw HTTPError if password does not match", () => {
		const invalidCredentialsErrorMessage = "Invalid email or password";
		const invalidCredentialsError = new HTTPError({
			name: loginMessages.invalidCredentials.name,
			msg: loginMessages.invalidCredentials.message,
			code: 400,
		});

		UserModel.findOne.mockReturnValue({
			select: jest.fn().mockReturnValue({
				exec: jest.fn().mockResolvedValue(invalidPasswordUser),
			}),
		});
		invalidPasswordUser.comparePassword.mockResolvedValue(false);
		loginMessages.invalidCredentials.message = invalidCredentialsErrorMessage;

		expect.assertions(3);
		return login({ email: "test@example.com", password: "password" }).catch(
			(error) => {
				expect(error).toEqual(invalidCredentialsError);
				expect(UserModel.findOne).toHaveBeenCalledWith({
					email: new RegExp(`^test@example.com$`, "i"),
				});
				expect(invalidPasswordUser.comparePassword).toHaveBeenCalledWith(
					"password"
				);
			}
		);
	});

	it("[SUCCESS] Should return token and verified status if login is successful", () => {
		const token = "generated-token";
		const verified = true;
		UserModel.findOne.mockReturnValue({
			select: jest.fn().mockReturnValue({
				exec: jest.fn().mockResolvedValue(foundUser),
			}),
		});
		foundUser.comparePassword.mockResolvedValue(true);
		generateToken.mockReturnValue(token);

		expect.assertions(4);

		return login({ email: "test@example.com", password: "password" }).then(
			(result) => {
				expect(result).toEqual({ token, verified });
				expect(UserModel.findOne).toHaveBeenCalledWith({
					email: new RegExp(`^test@example.com$`, "i"),
				});
				expect(foundUser.comparePassword).toHaveBeenCalledWith("password");
				expect(generateToken).toHaveBeenCalledWith({
					data: { id: foundUser._id },
				});
			}
		);
	});
});

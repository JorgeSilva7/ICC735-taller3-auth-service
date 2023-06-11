import UserModel from "../../src/models/user.model.js";
import { HTTPError } from "../../src/helpers/error.helper.js";
import verify from "../../src/logic/verify.logic.js";
import * as JWTHelpers from "../../src/helpers/jwt.helper.js";

jest.mock("../../src/models/user.model.js", () => ({
	findById: jest.fn().mockReturnThis(),
	select: jest.fn().mockReturnThis(),
	exec: jest.fn(),
}));

const verifyTokenStub = jest.spyOn(JWTHelpers, "verifyToken");

jest.mock("../../src/helpers/error.helper.js", () => {
	return {
		HTTPError: class MockHTTPError extends Error {
			constructor(errorObj) {
				super();
				Object.assign(this, errorObj);
			}
		},
	};
});

describe("verify", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("[ERROR] Should throw HTTPError with user not found message if user is not found", async () => {
		const foundUser = null;
		UserModel.exec.mockResolvedValue(foundUser);

		try {
			await verify({ userId: "123", code: "abc" });
			fail("Expected HTTPError to be thrown");
		} catch (error) {
			expect(error instanceof HTTPError).toBe(true);
			expect(error.name).toBe("verify_user_not_found_error");
			expect(error.msg).toBe("user not found");
			expect(error.code).toBe(404);
			expect(UserModel.findById).toHaveBeenCalledWith("123");
			expect(UserModel.select).toHaveBeenCalledWith("+code");
			expect(UserModel.exec).toHaveBeenCalled();
		}
	});

	it("[ERROR] Should throw HTTPError with already verified message if user is already verified", async () => {
		const foundUser = {
			verified: true,
		};
		UserModel.exec.mockResolvedValue(foundUser);

		class MockHTTPError extends HTTPError {
			constructor(errorObj) {
				super();
				Object.assign(this, errorObj);
			}
		}

		const mockHTTPError = new MockHTTPError({
			name: "verify_already_verified_error",
			msg: "the user is already verified",
			code: 400,
		});

		try {
			await verify({ userId: "123", code: "abc" });
			fail("Expected HTTPError to be thrown");
		} catch (error) {
			expect(error).toEqual(mockHTTPError);
			expect(UserModel.findById).toHaveBeenCalledWith("123");
			expect(UserModel.select).toHaveBeenCalledWith("+code");
			expect(UserModel.exec).toHaveBeenCalled();
		}
	});

	it("[ERROR] Should throw HTTPError with code not found message if code is null or empty", async () => {
		const foundUser = {
			code: null,
		};
		UserModel.exec.mockResolvedValue(foundUser);

		try {
			await verify({ userId: "123", code: "abc" });
			fail("Expected HTTPError to be thrown");
		} catch (error) {
			expect(error instanceof HTTPError).toBe(true);
			expect(error.name).toBe("verify_code_not_found_error");
			expect(error.msg).toBe("code not found. Please contact support");
			expect(error.code).toBe(404);
			expect(UserModel.findById).toHaveBeenCalledWith("123");
			expect(UserModel.select).toHaveBeenCalledWith("+code");
			expect(UserModel.exec).toHaveBeenCalled();
		}
	});

	it("[ERROR] Should throw HTTPError with invalid code message if the provided code does not match", async () => {
		const foundUser = {
			code: "def",
		};
		UserModel.exec.mockResolvedValue(foundUser);

		verifyTokenStub.mockReturnValue({ code: "abc" });

		try {
			await verify({ userId: "123", code: "def" });
			fail("Expected HTTPError to be thrown");
		} catch (error) {
			expect(error.name).toBe("verify_invalid_code_error");
			expect(error.msg).toBe("the code are invalid");
			expect(error.code).toBe(400);
			expect(UserModel.findById).toHaveBeenCalledWith("123");
			expect(UserModel.select).toHaveBeenCalledWith("+code");
			expect(UserModel.exec).toHaveBeenCalled();
			expect(verifyTokenStub).toHaveBeenCalledWith(foundUser.code);
		}
	});

	it("[ERROR] Should throw HTTPError when verifyToken return error", async () => {
		const foundUser = {
			code: "abc",
			setVerified: jest.fn().mockResolvedValue(),
		};
		UserModel.exec.mockResolvedValue(foundUser);

		verifyTokenStub.mockImplementation(() => {
			throw new TypeError("some-error");
		});

		try {
			await verify({ userId: "123", code: "abc" });
			throw new Error("unexpected error");
		} catch (error) {
			expect(error).toBeInstanceOf(HTTPError);
			expect(verifyTokenStub).toHaveBeenCalledWith(foundUser.code);
		}
	});

	it("[SUCCESS] Should call setVerified and return true if verification is successful", async () => {
		const foundUser = {
			code: "abc",
			setVerified: jest.fn().mockResolvedValue(),
		};
		UserModel.exec.mockResolvedValue(foundUser);

		verifyTokenStub.mockReturnValue({ code: "abc" });

		const result = await verify({ userId: "123", code: "abc" });

		expect(UserModel.findById).toHaveBeenCalledWith("123");
		expect(UserModel.select).toHaveBeenCalledWith("+code");
		expect(UserModel.exec).toHaveBeenCalled();
		expect(foundUser.setVerified).toHaveBeenCalled();
		expect(result).toBe(true);
		expect(verifyTokenStub).toHaveBeenCalledWith(foundUser.code);
	});
});

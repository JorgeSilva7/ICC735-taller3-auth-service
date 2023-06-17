import { required } from "./common.messages.js";

const action = "verify";

export default {
	validation: {
		name: `${action}_validation_error`,
		messages: {
			code: `${required("code")}`,
		},
	},
	codeExpired: {
		name: `${action}_code_expired_error`,
		message: "the code has expired",
	},
	userNotFound: {
		name: `${action}_user_not_found_error`,
		message: "user not found",
	},
	codeNotFound: {
		name: `${action}_code_not_found_error`,
		message: "code not found. Please contact support",
	},
	invalidCode: {
		name: `${action}_invalid_code_error`,
		message: "the code is not valid",
	},
	alreadyVerified: {
		name: `${action}_already_verified_error`,
		message: "the user is already verified",
	},
};

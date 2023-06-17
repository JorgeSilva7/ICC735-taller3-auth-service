import { required } from "./common.messages.js";

const action = "login";

export default {
	validation: {
		name: `${action}_validation_error`,
		messages: {
			email: `${required("email")} and must be a valid email`,
			password: required("email"),
		},
	},
	invalidCredentials: {
		name: `${action}_invalid_credentials_error`,
		message: "invalid credentials",
	},
	noVerified: {
		name: `${action}_no_verified_error`,
		message: "this user doesn't verified yet",
	},
	blocked: {
		name: `${action}_blocked_error`,
		message: "this user is blocked",
	},
};

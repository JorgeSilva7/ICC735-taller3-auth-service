import { required } from "./common.messages.js";

const action = "register";

export default {
	validation: {
		name: `${action}_validation_error`,
		messages: {
			email: `${required("email")} and must be a valid email`,
			password: required("password"),
			rut: required("rut"),
			name: required("name"),
			invalidRut:
				"rut must be a valid chilean rut (any format: with or without dots, with or without dash)",
			weakPassword:
				"password must include lower and upper case characters, at least one number, at least one symbol (@#$!%*?&) and at least 8 characters",
		},
	},
	alreadyExists: {
		name: `${action}_already_exists_error`,
		messages: {
			email: "the email already exists",
			rut: "the rut already exists",
		},
	},
	userNotAllowed: {
		name: `${action}_user_not_allowed_error`,
		message: "this user is not allowed to register in this platform",
	},
	criminalRecords: {
		apiError: {
			name: `${action}_api_error`,
			message: (message) => message,
		},
	},
};

import { required } from "./common.messages.js";

const action = "delete";

export default {
	userNotFound: {
		name: `${action}_user_not_found_error`,
		message: "user not found",
	},
};

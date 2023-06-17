import UserModel from "../models/user.model.js";
import { HTTPError } from "../helpers/error.helper.js";
import loginMessages from "../messages/login.messages.js";
import { generateToken } from "../helpers/jwt.helper.js";
import environment from "../config/environment.js";

const {
	NODE_ENV,
	ENVS: { dev },
} = environment;

/**
 * Check if the user is blocked
 * @param {boolean} args.blocked - User blocked flag
 * @throws {HTTPError} throws 403 HTTPError if user is blocked
 */
function checkIfUserBlocked({ blocked }) {
	if (blocked) {
		const { blocked } = loginMessages;

		throw new HTTPError({
			name: blocked.name,
			msg: blocked.message,
			code: 403,
		});
	}
}

/**
 *
 * @param {*} param0
 * @returns
 */
async function login({ email, password }) {
	const foundUser = await UserModel.findOne({
		email: new RegExp(`^${email}$`, "i"),
	})
		.select("+password")
		.exec();

	const { invalidCredentials } = loginMessages;

	if (!foundUser) {
		throw new HTTPError({
			name: invalidCredentials.name,
			msg: invalidCredentials.message,
			code: 400,
		});
	}

	const passwordMatch = await foundUser.comparePassword(password);

	if (!passwordMatch) {
		throw new HTTPError({
			name: invalidCredentials.name,
			msg: invalidCredentials.message,
			code: 400,
		});
	}

	if (NODE_ENV !== dev) {
		checkIfUserBlocked(foundUser);
	}

	const { _id, verified } = foundUser;

	const token = generateToken({ data: { id: _id } });

	return { token, verified };
}

export default login;

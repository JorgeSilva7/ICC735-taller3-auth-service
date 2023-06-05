import UserModel from "../models/user.model.js";
import { HTTPError } from "../helpers/error.helper.js";
import getMeMessages from "../messages/get-by-id.messages.js";

/**
 * Get user by id
 * @param {string} userId - User's object id
 * @returns {User} user found or throw 404
 */
async function getUserById(userId) {
	const foundUser = await UserModel.findById(userId).exec();

	if (!foundUser) {
		throw new HTTPError({
			name: getMeMessages.userNotFound.name,
			msg: getMeMessages.userNotFound.message,
			code: 404,
		});
	}

	return foundUser;
}

export default getUserById;

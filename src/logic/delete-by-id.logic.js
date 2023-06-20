import UserModel from "../models/user.model.js";
import { HTTPError } from "../helpers/error.helper.js";
import deleteMessages from "../messages/delete.messages.js";

/**
 * Delete the user by id
 * @param {string} userId - User id
 * @returns {boolean} true if the delete process complete successfully
 * @throws {HTTPError} throws 404 HTTPError when the user not found by the userId
 * @throws {HTTPError} throws 400 HTTPError when the user code not match with the input code
 */
async function deleteById(userId) {
	const foundUser = await UserModel.findById(userId).exec();

	if (!foundUser) {
		throw new HTTPError({
			name: deleteMessages.userNotFound.name,
			msg: deleteMessages.userNotFound.message,
			code: 404,
		});
	}

	await foundUser.delete();

	return true;
}

export default deleteById;

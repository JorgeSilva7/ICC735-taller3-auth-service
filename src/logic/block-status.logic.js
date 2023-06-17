import UserModel from "../models/user.model.js";
import { HTTPError } from "../helpers/error.helper.js";
import blockStatusMessage from "../messages/block-status.messages.js";

/**
 * Change block status of the user
 * @param {string} args.userId - User id to verify
 * @returns {User} Updated user
 * @throws {HTTPError} throws 404 HTTPError when the user not found by the userId
 * @throws {HTTPError} throws 400 HTTPError when the user code not match with the input code
 */
async function changeBlockStatus({ userId }) {
	const foundUser = await UserModel.findById(userId).exec();

	if (!foundUser) {
		throw new HTTPError({
			name: blockStatusMessage.userNotFound.name,
			msg: blockStatusMessage.userNotFound.message,
			code: 404,
		});
	}

	const user = await foundUser.changeBlockStatus();

	return user;
}

export default changeBlockStatus;

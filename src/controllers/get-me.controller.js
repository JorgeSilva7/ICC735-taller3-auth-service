import { returnErrorResponse } from "../helpers/error.helper.js";
import getUserById from "../logic/get-by-id.logic.js";

async function getMe(req, res) {
	const userId = req.userId;
	try {
		const user = await getUserById(userId);

		return res.status(200).json(user);
	} catch (error) {
		return returnErrorResponse(error, res);
	}
}

export default getMe;

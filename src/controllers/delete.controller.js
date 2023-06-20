import { returnErrorResponse } from "../helpers/error.helper.js";
import deleteById from "../logic/delete-by-id.logic.js";

async function deleteUser(req, res) {
	const userId = req.params.userId;
	try {
		await deleteById(userId);

		return res.status(204).json({});
	} catch (error) {
		return returnErrorResponse(error, res);
	}
}

export default deleteUser;

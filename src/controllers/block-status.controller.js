import { returnErrorResponse } from "../helpers/error.helper.js";
import blockStatusLogic from "../logic/block-status.logic.js";

async function changeBlockStatus(req, res) {
	try {
		const response = await blockStatusLogic({ userId: req.userId });

		return res.status(200).json(response);
	} catch (error) {
		return returnErrorResponse(error, res);
	}
}

export default changeBlockStatus;

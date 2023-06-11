import { JsonWebTokenError } from "jsonwebtoken";

class HTTPError extends Error {
	constructor({ name, msg, code }) {
		super();
		this.name = name;
		this.msg = msg;
		this.statusCode = code;
	}
}

/**
 * Error reusable response
 * @param {Error} error - Error instance
 * @param {express.Response} res - Express response
 * @returns {express.Response} express response with status code and error json
 */
function returnErrorResponse(error, res) {
	if (error instanceof HTTPError) {
		const { statusCode } = error;
		return res.status(statusCode).json({ error: { ...error } });
	}
	if (error instanceof JsonWebTokenError) {
		const jwtError = new HTTPError({
			name: error.name,
			msg: error.message,
			code: 403,
		});
		return res.status(403).json({ error: { ...jwtError } });
	}
	return res.status(500).json({ error: error.toString() });
}

export { HTTPError, returnErrorResponse };

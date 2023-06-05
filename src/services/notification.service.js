import axios from "axios";
import environment from "../config/environment.js";

const {
	NOTIFICATIONS_SERVICE: { BASE_URL, ENDPOINTS },
} = environment;

const axiosInstance = axios.create({ baseURL: BASE_URL });

/**
 * Send an email to an email (to) with a subject and body
 * @param {string} args.to - To email
 * @param {string} args.subject - Email subject
 * @param {string} args.body - Email Body in HTML or plain text
 * @returns {Promise<boolean>} true if the request return a successful code
 * @throws {Error} Any error from notifications service when the request return a error code (4xx, 5xx)
 */
function sendEmail({ to, subject, body }) {
	return axiosInstance
		.post(ENDPOINTS.SEND_EMAIL, {
			to,
			subject,
			body,
		})
		.then(() => true);
}

export { sendEmail };

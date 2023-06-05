import axios from "axios";
import environment from "../config/environment.js";
import registerMessages from "../messages/register.messages.js";
import { HTTPError } from "../helpers/error.helper.js";

const {
	REGISTRO_CIVIL_API: { BASE_URL, APIKEY },
} = environment;

const { criminalRecords } = registerMessages;

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		headers: {
			apikey: APIKEY,
		},
	},
});

/**
 * Get criminal records from Registro Civil API
 * @param {string} rut - User RUT
 * @returns {Promise<object>}
 *  	object.rut - User RUT
 * 		object.fullName - User full name
 * 		object.quantity - User's criminal records quantity (number)
 */
async function getCriminalRecords(rut) {
	return axiosInstance
		.get(`/person/${rut}/criminal_records`)
		.then((response) => response.data)
		.catch((error) => {
			const { status, data } = error.response;
			throw new HTTPError({
				name: criminalRecords.apiError.name,
				msg: criminalRecords.apiError.message(data ?? "unexpected error"),
				code: status,
			});
		});
}

export { getCriminalRecords, axiosInstance };

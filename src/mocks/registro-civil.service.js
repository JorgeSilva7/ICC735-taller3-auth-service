import { axiosInstance } from "../services/registro-civil.service.js";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axiosInstance);

const withCriminalRecords = ["777777777", "222222222"];

// For each rut in 'withCriminalRecords' array return quantity=1
withCriminalRecords.forEach((rut) =>
	mock
		.onGet(
			`/person/${rut}/criminal_records`,
			{},
			{ apikey: "1234", Accept: "application/json, text/plain, */*" }
		)
		.reply(200, { rut, fullName: "full name", quantity: 1 })
);

//Any rut on /person/$rut/criminal_records return quantity=0
mock
	.onGet(
		/\/person\/\d+\/criminal_records/,
		{},
		{ apikey: "1234", Accept: "application/json, text/plain, */*" }
	)
	.reply(200, { rut: "", fullName: "full name", quantity: 0 });

export default mock;

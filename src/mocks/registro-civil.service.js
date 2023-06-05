import { axiosInstance } from "../services/registro-civil.service.js";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axiosInstance);

const withoutCriminalRecords = ["777777777", "222222222", "666666666"];

// For each rut in 'withoutCriminalRecords' array return quantity=0
withoutCriminalRecords.forEach((rut) =>
	mock
		.onGet(`/person/${rut}/criminal_records`)
		.reply(200, { rut, fullName: "full name", quantity: 0 })
);

//Any rut on /person/$rut/criminal_records return quantity=1
mock
	.onGet(/\/person\/\d+\/criminal_records/)
	.reply(200, { rut: "", fullName: "full name", quantity: 1 });

export default mock;

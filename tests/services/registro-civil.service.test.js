import("../../src/mocks");
import { HTTPError } from "../../src/helpers/error.helper.js";
import { getCriminalRecords } from "../../src/services/registro-civil.service.js";

describe("getCriminalRecords", () => {
	it("should return a criminal records quantity=1 when request with 111111111", async () => {
		const rut = "111111111";

		const result = await getCriminalRecords(rut);

		expect(result.quantity).toBe(1);
	});

	it("should return a criminal records quantity=0 when request with 777777777", async () => {
		const rut = "777777777";

		const result = await getCriminalRecords(rut);

		expect(result.quantity).toBe(0);
	});

	it("should return a 404 when rut is empty", async () => {
		const rut = "";

		try {
			await getCriminalRecords(rut);
			throw new Error("unexpected error");
		} catch (error) {
			expect(error).toBeInstanceOf(HTTPError);
		}
	});
});

import { Factory } from "rosie";

const UserFactory = new Factory()
	.sequence("_id", (i) => `id-${i}`)
	.sequence("name", (i) => `user-${i}`)
	.sequence("email", (i) => `email-${i}@gmail.com`)
	.attr("password", "password-hash")
	.attr("rut", "11111111-i")
	.attr("verified", true)
	.attr("code", "token-jwt-code")
	.attr("blocked", false);

export default UserFactory;

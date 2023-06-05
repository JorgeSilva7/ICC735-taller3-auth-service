import express from "express";
import cors from "cors";

import { connectDB } from "./config/mongo.js";
import environment from "./config/environment.js";
import routes from "./routes.js";

const { PORT, HOST, NODE_ENV } = environment;

// Express configuration
const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("", routes);
app.get("/", function (req, res) {
	return res
		.status(200)
		.send({ details: "Taller 3: Auth Service", author: "JSilva" });
});

function loadMocks() {
	if (["development", "local"].includes(NODE_ENV)) {
		import("./mocks");
	}
}

async function startApp() {
	loadMocks();
	await connectDB().then(() => {
		console.log("Connected to mongo successfully");
		app.listen(PORT, () =>
			console.log(`Auth service running on ${HOST}:${PORT}`)
		);
	});
}

startApp().catch(() => process.exit(-1));

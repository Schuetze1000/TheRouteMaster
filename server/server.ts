import Express from "express";
import Morgan from "morgan";
import Mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { json } from "body-parser";
import { connectDB } from "./config/db";
import { UpdateICS } from "./utils/ics_crawler_v2";

const app = Express();
const port = process.env.PORT || 5000;
//const errorhandler = require('./middleware/error');
app.use(cookieParser());
app.use(Express.json());

connectDB();
UpdateICS();

app.use("/api/auth", require("./routes/auth"));
app.use("/api/ics", require("./routes/ics"));

//app.use(errorhandler);

const server = app.listen(port, () => {
	console.log(`Server listen on ${port}`);
});

process.on("unhandledRejection", (error, promise) => {
	console.log(`Logged Error: ${error}`);
	server.close(() => process.exit(1));
});

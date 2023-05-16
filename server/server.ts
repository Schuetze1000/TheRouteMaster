import Express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";
import { ICSUpdateAll } from "./middleware/ics";
import swaggerUi from 'swagger-ui-express';
import fs from  'fs';
import dotenv from 'dotenv';
import * as path from "path";
import cors from 'cors';

dotenv.config({path: path.resolve( __dirname,".env")});

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: "*",
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true
};

const app = Express();
const port = process.env.PORT || 5000;
app.use(cookieParser());
app.use(Express.json());
app.use(cors(options));

connectDB().then(() => {
	ICSUpdateAll();
});

const swagger = fs.readFileSync('./data/swagger.json');
const swagger_json = JSON.parse(swagger.toString());
app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swagger_json));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/ics", require("./routes/ics"));
app.use("/api/user", require("./routes/user"));

const server = app.listen(port, () => {
	console.log(`Server listen on ${port}`);
});

process.on("unhandledRejection", (error, promise) => {
	console.log(`Logged Error: ${error}`);
	server.close(() => process.exit(1));
});

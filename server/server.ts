import Express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";
import { ICSUpdateAll } from "./middleware/ics";
import { UpdateDeutscheBahnRoutes, sendInfoMail } from "./middleware/deutschebahn";
import swaggerUi from 'swagger-ui-express';
import fs from  'fs';
import path from "path";
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from "morgan";

dotenv.config({path: path.resolve( __dirname,".env")});

const allowedOrigins = ['http://localhost:3000', 'https://the-routemaster.schuetz-andreas.dev', "https://localhost"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true
};

const app = Express();
const port = process.env.PORT || 5000;
app.use(cookieParser());
app.use(Express.json());
app.use(morgan('combined'));
app.use(cors(options));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	if (err.name === 'UnauthorizedError') {
	  console.error('Blockierte Anfrage:', err.message);
	}
	next();
  });

connectDB().then(() => {
	ICSUpdateAll().then(() => UpdateDeutscheBahnRoutes());;
});

setInterval(() => {
	ICSUpdateAll().then(() => UpdateDeutscheBahnRoutes());
  }, 900000);

setInterval(() => {
	sendInfoMail();
}, 2400000 );

const swagger = fs.readFileSync('./data/swagger.json');
const swagger_json = JSON.parse(swagger.toString());
app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swagger_json));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/ics", require("./routes/ics"));
app.use("/api/user", require("./routes/user"));
app.use("/api/email", require("./routes/imgEmail"));
app.use("/api/navigation", require("./routes/navigation"));

const server = app.listen(port, () => {
	console.log(`Server listen on ${port}`);
});

process.on("unhandledRejection", (error, promise) => {
	console.log(`Logged Error: ${error}`);
	//server.close(() => process.exit(1));
});

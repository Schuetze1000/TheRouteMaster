import nodemailer from "nodemailer";

interface Options {
	to: string;
	subject: string;
	text: string;
}

const sendEmail = async (options: Options) => {
	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: Number(process.env.EMAIL_PORT),
		secure: true,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
		tls: {
            rejectUnauthorized: false
        }
	});
	const mailOptions = {
		from: process.env.EMAIL_FROM,
		to: options.to,
		subject: options.subject,
		html: options.text,
	};
	await transporter.sendMail(mailOptions, function (err, info) {
		if (err) {
			console.log(err);
		}
	});
};
export default sendEmail;

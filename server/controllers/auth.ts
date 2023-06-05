import { Response, Request } from "express";
import { ErrorResponse } from "../utils/errorResponse";
import User, { IUser } from "../models/user";
import sendEmail from "../utils/emailSender";
import crypto from "crypto";
import { sendToken, verifyToken } from "../middleware/auth";
import axios from "axios";
import { onError } from "../utils/errorResponse";

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

exports.login = async (req: Request, res: Response, next: any) => {
	const { identifier, password, reToken } = req.body;
	try {
		if (!identifier || !password || !reToken) {
			return next(new ErrorResponse("Please provide a valid email, password and reToken", 400));
		}
		let options = {
			method: "POST",
			url: `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${reToken}`,
		};

		const response = await axios(options);

		if (!response.data.success) {
			console.log(response);
			next(new ErrorResponse("Invalid reCaptcha", 403));
		}

		let user: IUser | null;
		if (identifier.includes("@")) {
			user = await User.findOne({ email: identifier }).select("+password");
		} else {
			user = await User.findOne({ username: identifier }).select("+password");
		}

		if (!user) {
			return next(new ErrorResponse("Invalid Credentials", 403));
		}
		if (!user.active) {
			return next(new ErrorResponse("Account deactivated", 401));
		}

		const isMatch: boolean = await user.matchPassword(password);
		if (!isMatch) {
			return next(new ErrorResponse("Invalid Credentials", 401));
		}
		sendToken(user, 201, res);
		res.end();
		console.log("true");
	} catch (error: any) {
		onError(error, next);
	}
};

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

exports.register = async (req: Request, res: Response, next: any) => {
	const { username, email, password, reToken } = req.body;
	try {
		if (!username || !email || !password || !reToken) {
			next(new ErrorResponse("Please provide a valid username, email, password and reToken", 400));
		}
		const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${reToken}`);
		if (!response.data.success) {
			next(new ErrorResponse("Invalid reCaptcha", 403));
		}

		const user: IUser = await User.create({
			username,
			email,
			password,
		});

		sendToken(user, 201, res);
		res.end();
	} catch (error) {
		onError(error, next, 500);
	}
};

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

exports.forgotPassword = async (req: Request, res: Response, next: any) => {
	const { email } = req.body;

	try {
		const user: IUser | null = await User.findOne({ user: email });
		if (!user) {
			return next(new ErrorResponse("Email could not be sent", 404));
		}
		const resetToken = user.getResetPasswordToken();
		await user.save();

		const resetUrl = `https://the-routemaster.schuetz-andreas.dev/passwordreset/${resetToken}`;
		const header = `Password reset the-routemaster.schuetz-andreas.dev`;
		const message = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:arial, 'helvetica neue', helvetica, sans-serif"><head><meta charset="UTF-8"><meta content="width=device-width, initial-scale=1" name="viewport"><meta name="x-apple-disable-message-reformatting"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta content="telephone=no" name="format-detection"><title>New message</title><!--[if (mso 16)]><style type="text/css"> a {text-decoration: none;} </style><![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG></o:AllowPNG> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><!--[if !mso]><!-- --><link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet"><!--<![endif]--><style type="text/css">#outlook a { padding:0;}.es-button { mso-style-priority:100!important; text-decoration:none!important;}a[x-apple-data-detectors] { color:inherit!important; text-decoration:none!important; font-size:inherit!important; font-family:inherit!important; font-weight:inherit!important; line-height:inherit!important;}.es-desk-hidden { display:none; float:left; overflow:hidden; width:0; max-height:0; line-height:0; mso-hide:all;}@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:50px!important; text-align:center!important } h2 { font-size:26px!important; text-align:left } h3 { font-size:20px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:50px!important; text-align:center!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important; text-align:left } .es-menu td a { font-size:12px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:12px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0!important } .es-m-p0r { padding-right:0!important } .es-m-p0l { padding-left:0!important } .es-m-p0t { padding-top:0!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } .es-m-p5 { padding:5px!important } .es-m-p5t { padding-top:5px!important } .es-m-p5b { padding-bottom:5px!important } .es-m-p5r { padding-right:5px!important } .es-m-p5l { padding-left:5px!important } .es-m-p10 { padding:10px!important } .es-m-p10t { padding-top:10px!important } .es-m-p10b { padding-bottom:10px!important } .es-m-p10r { padding-right:10px!important } .es-m-p10l { padding-left:10px!important } .es-m-p15 { padding:15px!important } .es-m-p15t { padding-top:15px!important } .es-m-p15b { padding-bottom:15px!important } .es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p20 { padding:20px!important } .es-m-p20t { padding-top:20px!important } .es-m-p20r { padding-right:20px!important } .es-m-p20l { padding-left:20px!important } .es-m-p25 { padding:25px!important } .es-m-p25t { padding-top:25px!important } .es-m-p25b { padding-bottom:25px!important } .es-m-p25r { padding-right:25px!important } .es-m-p25l { padding-left:25px!important } .es-m-p30 { padding:30px!important } .es-m-p30t { padding-top:30px!important } .es-m-p30b { padding-bottom:30px!important } .es-m-p30r { padding-right:30px!important } .es-m-p30l { padding-left:30px!important } .es-m-p35 { padding:35px!important } .es-m-p35t { padding-top:35px!important } .es-m-p35b { padding-bottom:35px!important } .es-m-p35r { padding-right:35px!important } .es-m-p35l { padding-left:35px!important } .es-m-p40 { padding:40px!important } .es-m-p40t { padding-top:40px!important } .es-m-p40b { padding-bottom:40px!important } .es-m-p40r { padding-right:40px!important } .es-m-p40l { padding-left:40px!important } }</style></head>
<body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"><div class="es-wrapper-color" style="background-color:#340a13"><!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#340a13"></v:fill> </v:background><![endif]--><table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#340a13"><tr><td valign="top" style="padding:0;Margin:0"><table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"><tr><td align="center" bgcolor="#340a13" style="padding:0;Margin:0;background-color:#340a13"><table bgcolor="#2a060e" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#2a060e;width:600px"><tr><td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"><table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td align="center" valign="top" style="padding:0;Margin:0;width:560px"><table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#FFFFFF;font-size:18px"><img src="https://qbekxq.stripocdn.email/content/guids/CABINET_48aabe064b742558ffdd5bf299d974274eb30b573f3fe67a02154bd4849fa4cd/images/1085975_GxF.png" alt="Logo" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" height="50" title="Logo"></a></td>
</tr></table></td></tr></table></td></tr><tr><td class="es-m-p40t" align="left" style="Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;padding-bottom:40px"><table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td align="center" valign="top" style="padding:0;Margin:0;width:560px"><table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr class="es-mobile-hidden"><td align="center" height="85" style="padding:0;Margin:0"></td>
</tr><tr><td align="center" style="padding:0;Margin:0;padding-bottom:15px;font-size:0px"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#FFFFFF;font-size:18px"><img src="https://qbekxq.stripocdn.email/content/guids/CABINET_48aabe064b742558ffdd5bf299d974274eb30b573f3fe67a02154bd4849fa4cd/images/resetpassword_1.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="60"></a></td></tr><tr><td align="center" style="padding:0;Margin:0;padding-bottom:40px"><h1 style="Margin:0;line-height:72px;mso-line-height-rule:exactly;font-family:Righteous, sans-serif;font-size:60px;font-style:normal;font-weight:bold;color:#FFFFFF">You have requested a password reset</h1></td>
</tr><tr><td align="center" class="es-m-p0r es-m-p0l" style="padding:0;Margin:0;padding-bottom:40px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Manrope, sans-serif;line-height:27px;color:#FFFFFF;font-size:18px">Please click the button to reset your password</p></td>
</tr><tr><td align="center" style="padding:0;Margin:0;padding-top:20px;padding-bottom:40px"><!--[if mso]><a href="" target="_blank" hidden> <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="" style="height:58px; v-text-anchor:middle; width:378px" arcsize="50%" stroke="f" fillcolor="#da4017"> <w:anchorlock></w:anchorlock> <center style='color:#ffffff; font-family:Righteous, sans-serif; font-size:23px; font-weight:400; line-height:23px; mso-text-raise:1px'>RESET PASSWORD</center> </v:roundrect></a><![endif]--><!--[if !mso]><!-- --><span class="msohide es-button-border" style="border-style:solid;border-color:#2CB543;background:#da4017;border-width:0px;display:inline-block;border-radius:30px;width:auto;mso-hide:all"><a href="${resetUrl}" class="es-button es-button-1675432559559" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:24px;display:inline-block;background:#da4017;border-radius:30px;font-family:Righteous, sans-serif;font-weight:normal;font-style:normal;line-height:29px;width:auto;text-align:center;padding:15px 40px;mso-padding-alt:0;mso-border-alt:10px solid #da4017;letter-spacing:5px">RESET PASSWORD</a></span><!--<![endif]--></td>
</tr></table></td></tr></table></td>
</tr><tr><td class="esdev-adapt-off" align="left" background="https://qbekxq.stripocdn.email/content/guids/CABINET_48aabe064b742558ffdd5bf299d974274eb30b573f3fe67a02154bd4849fa4cd/images/unbenannt_cPu.png" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px;background-image:url(https://qbekxq.stripocdn.email/content/guids/CABINET_48aabe064b742558ffdd5bf299d974274eb30b573f3fe67a02154bd4849fa4cd/images/unbenannt_cPu.png);background-repeat:no-repeat;background-position:center center"><table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px"><tr><td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"><table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"><tr><td align="left" style="padding:0;Margin:0;width:225px"><table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td align="right" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://qbekxq.stripocdn.email/content/guids/CABINET_48aabe064b742558ffdd5bf299d974274eb30b573f3fe67a02154bd4849fa4cd/images/issueicon1320185886729792536.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="95"></td>
</tr></table></td></tr></table></td><td style="padding:0;Margin:0;width:20px"></td>
<td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"><table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"><tr><td align="left" style="padding:0;Margin:0;width:315px"><table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td align="left" style="padding:0;Margin:0;padding-top:20px;padding-bottom:20px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Manrope, sans-serif;line-height:27px;color:#FFFFFF;font-size:18px">Have a question?<br><a target="_blank" href="https://github.com/Schuetze1000/TheRouteMaster/issues" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#FFFFFF;font-size:18px">Reach out to our team</a></p>
</td></tr></table></td></tr></table></td></tr></table></td></tr></table></td>
</tr></table><table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"><tr><td align="center" style="padding:0;Margin:0"><table bgcolor="#ffffff" class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#07021F;width:600px"><tr><td align="left" bgcolor="#2a060e" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:40px;padding-bottom:40px;background-color:#2a060e"><table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td align="left" style="padding:0;Margin:0;width:560px"><table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td align="center" style="padding:0;Margin:0;font-size:0"><table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td align="center" valign="top" style="padding:0;Margin:0"><a target="_blank" href="https://github.com/Schuetze1000/TheRouteMaster" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"><img src="https://qbekxq.stripocdn.email/content/assets/img/other-icons/logo-black/github-logo-black.png" alt="GitHub" title="GitHub" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
</tr></table></td></tr><tr><td align="center" style="padding:20px;Margin:0;font-size:0"><table border="0" width="65%" height="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td style="padding:0;Margin:0;border-bottom:1px solid #cccccc;background:unset;height:1px;width:100%;margin:0px"></td></tr></table></td>
</tr><tr><td align="center" class="es-infoblock made_with" style="padding:0;Margin:0;line-height:0px;font-size:0px;color:#CCCCCC"><a target="_blank" href="https://the-routemaster.schuetz-andreas.dev/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"><img src="https://qbekxq.stripocdn.email/content/guids/CABINET_48aabe064b742558ffdd5bf299d974274eb30b573f3fe67a02154bd4849fa4cd/images/logo512_mUE.png" alt width="65" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr></table></div></body></html>`;
		try {
			await sendEmail({
				to: user.email,
				text: message,
				subject: header,
			});
			res
				.status(200)
				.json({
					success: true,
					data: "Email Sent",
				})
				.end();
		} catch (error) {
			user.resetPasswordToken = undefined;
			user.resetPasswordExpire = undefined;
			await user.save();

			return next(new ErrorResponse("Email could not be sent", 500));
		}
	} catch (error) {
		onError(error, next, 500);
	}
};

// ------------------------------------------------------------------------------------------------------------------------------------------------ //

exports.resetPassword = async (req: Request, res: Response, next: any) => {
	const { password } = req.body;
	const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
	try {
		const user: IUser | null = await User.findOne({
			resetPasswordToken,
			resetPasswordExpire: { $gt: Date.now() },
		});

		if (!user) {
			return next(new ErrorResponse("Invalid Reset Token", 400));
		}
		user.password = password;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;
		await user.save();
		res
			.status(201)
			.json({
				success: true,
				data: "Password Reset successful",
			})
			.end();
	} catch (error) {
		onError(error, next, 500);
	}
};

exports.refreshToken = async (req: Request, res: Response, next: any) => {
	try {
		console.log("REFRESH");

		const user: IUser | null = await verifyToken(req, res, true, true);
		sendToken(user, 201, res);
		res.end();
	} catch (error) {
		onError(error, next);
	}
};

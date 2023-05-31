import Input_Settings from "../../components/inputs/in_settings";
import { useNavigate } from "react-router";
import useColorMode from "../../hooks/useColorMode";
import { useEffect } from "react";
import { isLoggedIn } from "axios-jwt";
import { axiosInstance } from "../../hooks/jwtAuth";
import { useForm } from "../../hooks/useForm";

//TODO Better Styling and Show Error Message @Leonidas-maker
function ChangePassword() {
	const [colorMode, setColorMode] = useColorMode();
	const navigate = useNavigate();

	const initialState = {
		password: "",
	};

	const { onChange, onSubmit, values } = useForm(onBtnChangeClick, initialState);

	function getInputValue(id: string): string {
		try {
			const value: string = (document.getElementById(id) as HTMLInputElement).value;
			return value;
		} catch {
			return "";
		}
	}

	useEffect(() => {
		if (!isLoggedIn()) {
			navigate("/login");
		}
	}, []);

	async function onBtnChangeClick() {
		const oldpassword = getInputValue("old_password");
		const newpassword1 = getInputValue("new_password");
		const newpassword2 = getInputValue("repeat_new_password");

		if (newpassword1 === newpassword2) {
			const options = {
				method: "PUT",
				url: "/user/updatepassword",
				data: {
					oldpassword: oldpassword,
					newpassword: newpassword1,
				},
				withCredentials: true,
			};
			axiosInstance(options)
				.then(() => {
					navigate("/login");
				})
				.catch((error) => {
					if (error.response.status >= 400 && error.response.status < 500) {
						console.log(error);
						//TODO show Error @Leonidas-maker
					}
				});
		} else {
			//TODO show Error @Leonidas-maker
		}
	}

	function onBtnAbortClick() {
		navigate("/settings");
	}

	// ---------------------------------------------------------------------------------------------- //
	// -------------------------------------- Return Functions -------------------------------------- //
	// ---------------------------------------------------------------------------------------------- //
	//TODO Better styling -> inputs broken? @Leonidas-maker
	return (
		<body className="h-screen">
			<div className="relative overflow-auto bg-cover bg-no-repeat h-full w-full text-center bg-landing m-auto object-none object-center">
				<div
					className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-auto bg-fixed"
					style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
				>
					<form onSubmit={onSubmit} className="flex justify-center flex-col m-auto h-screen w-screen">
						<div className="relative bg-white dark:bg-neutral-600 bg-opacity-100 rounded-lg w-75 h-50 mx-auto p-6 mb-2 shadow-2xl grid items-center">
							<h1 className="text-black dark:text-white font-bold text-2xl mb-5">Passwort ändern</h1>

							<div className="relative mb-3">
								<input
									className="peer input mt-2 mb-2 md:mt-2 dark:border-gray-500 pr-12 disabled:bg-slate-50 dark:disabled:bg-gray-600 \
                                        disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:text-slate-700"
									name="password"
									id="old_password"
									type="password"
									placeholder="Altes Passwort"
									onChange={onChange}
									required
								/>
								<label htmlFor="old_password" className="settings-input">
									Altes Passwort
								</label>
							</div>

							<div className="relative mb-3">
								<input
									className="peer input mt-2 mb-2 md:mt-2 dark:border-gray-500 pr-12 disabled:bg-slate-50 dark:disabled:bg-gray-600 \
                                        disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:text-slate-700"
									name="password"
									id="new_password"
									type="password"
									placeholder="Neues Passwort"
									onChange={onChange}
									required
								/>
								<label htmlFor="new_password" className="settings-input"> 
									Neues Passwort
								</label>
							</div>

							<div className="relative mb-3">
								<input
									className="peer input mt-2 mb-2 md:mt-2 dark:border-gray-500 pr-12 disabled:bg-slate-50 dark:disabled:bg-gray-600 \
                                        disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:text-slate-700"
									name="password"
									id="repeat_new_password"
									type="password"
									placeholder="Neues Passwort wiederholen"
									onChange={onChange}
									required
								/>
								<label htmlFor="repeat_new_password" className="settings-input"> 
									Neues Passwort wiederholen
								</label>
							</div>
						</div>

						<div className="flex justify-center space-x-10">
							<button type="submit" className="button">
								Ändern
							</button>
							<button onClick={onBtnAbortClick} type="reset" className="button bg-red-500 hover:bg-red-600">
								Abbrechen
							</button>
						</div>
					</form>
				</div>
			</div>
		</body>
	);
}

export default ChangePassword;

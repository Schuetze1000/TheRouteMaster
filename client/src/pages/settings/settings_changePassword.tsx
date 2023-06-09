import Input_Settings from "../../components/inputs/in_settings";
import { useNavigate } from "react-router";
import useColorMode from "../../hooks/useColorMode";
import { useEffect, useState } from "react";
import { isLoggedIn } from "axios-jwt";
import { axiosInstance } from "../../hooks/jwtAuth";
import { useForm } from "../../hooks/useForm";

//TODO Better Styling and Show Error Message @Leonidas-maker
function ChangePassword() {
	const [colorMode, setColorMode] = useColorMode();
	const navigate = useNavigate();

	const [passwordShown, setPasswordShown] = useState(false);

	const [identifierError, setIdentifierError] = useState(false);

	const [pswSVGx, setPswSVGx] = useState<number>(23);
    const [pswSVGy, setPswSVGy] = useState<number>(23);
    const [pswSVGr, setPswSVGr] = useState<number>(0);
    const [pswSVG, setPswSVG] = useState<string>("M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24");

	const initialState = {
		password: "",
	};

	const { onChange, onSubmit, values } = useForm(onBtnChangeClick, initialState);

	const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
        if (pswSVGx == 23) {
            setPswSVGx(1);
            setPswSVGy(1);
            setPswSVGr(3);
            setPswSVG("M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z");
        } else {
            setPswSVGx(23);
            setPswSVGy(23);
            setPswSVGr(0);
            setPswSVG("M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24");
        }
    };

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

	function onChangeClick() {
        setIdentifierError(true);
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
									className={`peer input ${identifierError ? "invalid:border-red-500" : ""}`}
									name="password"
									id="password"
									type={passwordShown ? "text" : "password"}
									placeholder="Passwort"
									onChange={onChange}
									required
								/>

								<label
									htmlFor="password"
									className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Altes Passwort
								</label>
								<button className="absolute inset-y-0 right-0 bottom-5 top-5 flex items-center pr-3" onClick={togglePasswordVisiblity} type="button">
									<svg
										className="w-5 h-5 text-gray-500 dark:text-gray-400"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d={pswSVG}
										/>
										<line x1="1" y1="1" x2={pswSVGx} y2={pswSVGy} />
										<circle cx="12" cy="12" r={pswSVGr} />
									</svg>
								</button>
                        	</div>

							<div className="relative mb-3">
								<input
									className={`peer input ${identifierError ? "invalid:border-red-500" : ""}`}
									name="password"
									id="password"
									type={passwordShown ? "text" : "password"}
									placeholder="Passwort"
									onChange={onChange}
									required
								/>

								<label
									htmlFor="password"
									className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Neues Passwort
								</label>
								<button className="absolute inset-y-0 right-0 bottom-5 top-5 flex items-center pr-3" onClick={togglePasswordVisiblity} type="button">
									<svg
										className="w-5 h-5 text-gray-500 dark:text-gray-400"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d={pswSVG}
										/>
										<line x1="1" y1="1" x2={pswSVGx} y2={pswSVGy} />
										<circle cx="12" cy="12" r={pswSVGr} />
									</svg>
								</button>
                        	</div>

							<div className="relative mb-3">
								<input
									className={`peer input ${identifierError ? "invalid:border-red-500" : ""}`}
									name="password"
									id="password"
									type={passwordShown ? "text" : "password"}
									placeholder="Passwort"
									onChange={onChange}
									required
								/>

								<label
									htmlFor="password"
									className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Wiederholen
								</label>
								<button className="absolute inset-y-0 right-0 bottom-5 top-5 flex items-center pr-3" onClick={togglePasswordVisiblity} type="button">
									<svg
										className="w-5 h-5 text-gray-500 dark:text-gray-400"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d={pswSVG}
										/>
										<line x1="1" y1="1" x2={pswSVGx} y2={pswSVGy} />
										<circle cx="12" cy="12" r={pswSVGr} />
									</svg>
								</button>
                        	</div>
						</div>

						<div className="flex justify-center space-x-10">
							<button onClick={onChangeClick} type="submit" className="standard-button">
								Ändern
							</button>
							<button onClick={onBtnAbortClick} type="reset" className="standard-button-red">
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

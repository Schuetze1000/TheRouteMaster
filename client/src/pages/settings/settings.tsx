import Navbar_settings from "../../components/navbars/Navbar_settings";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useColorMode from "../../hooks/useColorMode";
import Select from "react-tailwindcss-select";
import Input_Settings from "../../components/inputs/in_settings";
import { getAccessToken } from "axios-jwt";
import React from "react";
import { axiosInstance } from "../../hooks/jwtAuth";
import { PopupSave, PopupLoading, PopupPasswordRequired } from "../../components/popups/settings";

interface HomeaddressStructure {
	number: string;
	street: string;
	zip: string;
	city: string;
	state: string;
	country: string;
}

interface UserStructure {
	username: string;
	email: string;
	ics_uid: string;
	firstname: string;
	surname: string;
	avatar: string;
	homeaddress: HomeaddressStructure;
}

function Settings() {
	const [userInf, setUserInf] = useState<UserStructure>({
		username: "",
		email: "",
		ics_uid: "",
		firstname: "",
		surname: "",
		avatar: "",
		homeaddress: {
			number: "",
			street: "",
			zip: "",
			city: "",
			state: "",
			country: "",
		},
	});
	const navigate = useNavigate();
	const [colorMode, setColorMode] = useColorMode();
	const [icsNameList, setICSNameList] = useState<[{ value: string; label: string }]>([{ value: "", label: "" }]);
	const [uniNameList, setUniNameList] = useState<[{ value: string; label: string }]>([{ value: "", label: "" }]);
	const [isLoading, setLoading] = useState(true);
	const [selectedICS, setSelectedICS] = useState(null);
	const [selectedICSValue, setSelectedICSValue] = useState("");
	const [selectedUni, setSelectedUni] = useState(null);

	const [zip_city, setZip_City] = useState("");
	const [street_number, setStreet_Number] = useState("");

	const [inUsernameisDisabled, setInUsernameisDisabled] = useState(true);
	const [inEmailisDisabled, setInEmailisDisabled] = useState(true);
	const [inSurnameisDisabled, setInSurnameisDisabled] = useState(true);
	const [inFirstnameisDisabled, setInFirstnameisDisabled] = useState(true);

	const [passwordNeeded, setPasswordNeeded] = useState(false);

	const [profileChanged, setProfileChanged] = useState(false);
	const [emailOrUsernameChanged, setEmailOrUsernameChanged] = useState(false);

	const [savePopupVisible, setSavePopupVisible] = useState(false);
	const [passwortPopupVisible, setPasswortPopupVisible] = useState(false);

	useEffect(() => {
		setUniNameList([{ value: "01", label: "DHBW Mannheim" }]);
		const optionsUser = {
			method: "GET",
			url: "/user/getuser",
			withCredentials: true,
		};
		axiosInstance(optionsUser)
			.then((resUserInf) => {
				const dataUserInf = resUserInf.data;
				let tmpuserinf: UserStructure = {
					username: dataUserInf.username,
					email: dataUserInf.email,
					ics_uid: dataUserInf.ics_uid,
					firstname: dataUserInf?.profile.firstname || "",
					surname: dataUserInf?.profile.surname || "",
					avatar: dataUserInf?.profile.avatar || "",
					homeaddress: {
						number: dataUserInf?.profile.homeaddress.number || "",
						street: dataUserInf?.profile.homeaddress.street || "",
						zip: dataUserInf?.profile.homeaddress.zip || "",
						city: dataUserInf?.profile.homeaddress.city || "",
						state: dataUserInf?.profile.homeaddress.state || "",
						country: dataUserInf?.profile.homeaddress.country || "",
					},
				};

				setUserInf(tmpuserinf);
				if (tmpuserinf.homeaddress.zip && tmpuserinf.homeaddress.city) {
					setZip_City(`${userInf.homeaddress.zip}, ${userInf.homeaddress.city}`);
				}

				if (tmpuserinf.homeaddress.street && tmpuserinf.homeaddress.number) {
					setZip_City(`${userInf.homeaddress.street}, ${userInf.homeaddress.number}`);
				}

				setLoading(false);
			})
			.catch((error) => {
				if (error.response.status >= 400 && error.response.status < 500) {
					window.location.href = "/login";
				}
			});

		const optionsGetICS = {
			method: "GET",
			url: "/ics/getavailableics",
			withCredentials: true,
		};
		axiosInstance(optionsGetICS)
			.then((resAvailableIcs) => {
				var icsArray: [{ value: string; label: string }] = [{ label: resAvailableIcs.data[0].name, value: resAvailableIcs.data[0].uid }];
				for (let index = 1; index < resAvailableIcs.data.length; index++) {
					icsArray.push({ label: resAvailableIcs.data[index].name, value: resAvailableIcs.data[index].uid });
				}
				setICSNameList(icsArray);
			})
			.catch((error) => {
				if (error.response.status >= 400 && error.response.status < 500) {
					window.location.href = "/login";
				}
			});
	}, []);

	function handleChangeUni(value) {
		setSelectedUni(value);
	}

	function handleChangeICS(value) {
		setProfileChanged(true);
		setSelectedICS(value);
		setSelectedICSValue(value.value);
	}

	function getInputValue(id: string): string {
		try {
			const value: string = (document.getElementById(id) as HTMLInputElement).value;
			return value;
		} catch {
			return "";
		}
	}
	function saveEmailAndUsername() {
		const password = getInputValue("password");
		if (!password) {
			setPasswortPopupVisible(true);
			throw "password required!";
		}
		const updateoption1 = {
			method: "PUT",
			url: "/user/updateEmail",
			headers: { Authorization: "Bearer " + getAccessToken() },
			withCredentials: true,
			data: {
				email: getInputValue("email"),
				password: password,
			},
		};

		axiosInstance(updateoption1)
			.then(() => {
				const updateoption2 = {
					method: "PUT",
					url: "/user/username",
					headers: { Authorization: "Bearer " + getAccessToken() },
					withCredentials: true,
					data: {
						email: getInputValue("username"),
						password: password,
					},
				};
				axiosInstance(updateoption2).catch((error) => {
					if (error.response.status >= 400 && error.response.status < 500 && error.response.status != 418) {
						//TODO Save failed animation @Leonidas-maker / @Schuetze1000
					}
				});
				setPasswordNeeded(false);
				(document.getElementById("password") as HTMLInputElement).value = "";
			})
			.catch((error) => {
				if (error.response.status >= 400 && error.response.status < 500 && error.response.status != 418) {
					//TODO Save failed animation @Leonidas-maker / @Schuetze1000
				}
			});
	}
	function saveProfileChanges() {
		const streetNumber = getInputValue("street_number");
		const zipCity = getInputValue("zip_city");
		let ar_streetNumber = ["", ""];
		let ar_zipCity = ["", ""];

		if (streetNumber.match("/[A-Z]+.[0-9]+/gm") || zipCity.match("/[0-9]+,[A-Z]+/gm")) {
			ar_streetNumber = getInputValue("street_number").split(",");
			ar_zipCity = getInputValue("zip_city").split(",");
		} else {
			throw "Missmatch!";
		}

		const updateoption = {
			method: "PUT",
			url: "/user/updateprofile",
			headers: { Authorization: "Bearer " + getAccessToken() },
			withCredentials: true,
			data: {
				ics_uid: selectedICSValue,
				profile: {
					firstname: getInputValue("firstname"),
					surname: getInputValue("surname"),
					avatar: getInputValue("avatar"),
					homeaddress: {
						number: ar_streetNumber[1],
						street: ar_streetNumber[0],
						zip: ar_zipCity[0],
						city: ar_zipCity[1],
						state: getInputValue("state"),
						country: getInputValue("country"),
					},
				},
			},
		};
		axiosInstance(updateoption).catch((error) => {
			if (error.response.status >= 400 && error.response.status < 500 && error.response.status != 418) {
				//TODO Save failed animation @Leonidas-maker / @Schuetze1000
			}
		});
	}

	function onClickUsername() {
		setEmailOrUsernameChanged(true);
		setInUsernameisDisabled(false);
		setPasswordNeeded(true);
	}
	function onClickEmail() {
		setEmailOrUsernameChanged(true);
		setInEmailisDisabled(false);
		setPasswordNeeded(true);
	}

	function onClickFirstname() {
		setProfileChanged(true);
		setInFirstnameisDisabled(false);
	}

	function onClickSurname() {
		setProfileChanged(true);
		setInSurnameisDisabled(false);
	}

	function onBtnBackClick(force: boolean) {
		if ((!profileChanged && !emailOrUsernameChanged) || force) {
			navigate("/");
		} else {
			if (profileChanged) {
				setSavePopupVisible(true);
			}
			if (emailOrUsernameChanged) {
				setSavePopupVisible(true);
			}
		}
	}

	function onBtnSaveClick() {
		try {
			setInEmailisDisabled(true);
			setInUsernameisDisabled(true);
			setInFirstnameisDisabled(true);
			setInSurnameisDisabled(true);

			setEmailOrUsernameChanged(false);
			setProfileChanged(false);
		} catch (error) {
			console.error(error);
		}
		if (profileChanged) {
			saveProfileChanges();
		}
		if (emailOrUsernameChanged) {
			saveEmailAndUsername();
		}
	}

	function onClickPopSaveClose() {
		setSavePopupVisible(false);
	}

	function onClickPopPasswordClose() {
		setPasswortPopupVisible(false);
	}

	if (isLoading) {
		return <DummySettings />;
	}

	return (
		<body className="h-screen">
			<Navbar_settings />
			<div className="relative overflow-auto bg-cover bg-no-repeat h-full w-full text-center bg-landing m-auto object-none object-center">
				<div
					className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-auto bg-fixed"
					style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
				>
					<div className="relative top-[2%]">
						<h1 className="text-white font-bold text-7xl tracking-wider">Settings</h1>
					</div>
					<div className="flex w-full h-auto items-center justify-center">
						<div className="settings-box">
							<h1 className="font-bold text-xl">Account bearbeiten</h1>

							<Input_Settings
								name="username"
								id="username"
								type="username"
								placeholder="Username"
								value={userInf.username}
								isDisabled={inUsernameisDisabled}
								Click={onClickUsername}
							/>
							<Input_Settings
								name="identifier"
								id="email"
								type="identifier"
								placeholder="Email"
								value={userInf.email}
								isDisabled={inEmailisDisabled}
								Click={onClickEmail}
							/>

							<Input_Settings
								name="password"
								id="password"
								type="password"
								placeholder="Password required to change Username or Email!"
								value={""}
								isVisable={passwordNeeded}
								isDisabled={false}
								hasEditButton={false}
							/>

							<Input_Settings
								name="text"
								id="firstname"
								type="text"
								placeholder="Vorname"
								value={userInf.firstname}
								isDisabled={inFirstnameisDisabled}
								Click={onClickFirstname}
							/>

							<Input_Settings
								name="text"
								id="surname"
								type="text"
								placeholder="Nachname"
								value={userInf.surname}
								isDisabled={inSurnameisDisabled}
								Click={onClickSurname}
							/>

							<h2>Passwort ändern:</h2>
							<Input_Settings
								name="password"
								id="old_password"
								type="password"
								placeholder="Altes Passwort"
								isDisabled={false}
								hasEditButton={false}
							/>
							<Input_Settings
								name="password"
								id="new_password"
								type="password"
								placeholder="Neues Passwort"
								isDisabled={false}
								hasEditButton={false}
							/>
							<Input_Settings
								name="password"
								id="repeat_new_password"
								type="password"
								placeholder="Neues Passwort wiederholen"
								isDisabled={false}
								hasEditButton={false}
							/>

							<h1 className="font-bold text-xl">Standardeinstellungen</h1>
							<h2>Wohnort ändern:</h2>
							<div className=" grid grid-cols-4 gap-x-6">
								<Input_Settings name="country" id="country" type="text" placeholder="Land" value={userInf.homeaddress.country} isDisabled={true} />
								<Input_Settings name="state" id="state" type="text" placeholder="Bundesland" value={userInf.homeaddress.state} isDisabled={true} />

								<Input_Settings name="zip_city" id="city" type="text" placeholder="PLZ, Stadt" value={zip_city} isDisabled={true} />

								<Input_Settings
									name="street_number"
									id="street_number"
									type="text"
									placeholder="Straße, Hausnummer"
									value={street_number}
									isDisabled={true}
								/>
							</div>

							<div className="relative mb-2 md:mb-10">
								<h2>Universität ändern:</h2>
								<Select
									primaryColor={"blue"} // Not Working
									placeholder="DHBW Mannheim"
									value={selectedUni}
									onChange={handleChangeUni}
									options={uniNameList}
									classNames={{
										menuButton: () =>
											"flex bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 \
												dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 \
												dark:focus:border-blue-500",
										menu: "absolute z-10 w-full bg-gray-50 shadow-lg border rounded-lg border-gray-300 text-gray-900 focus:ring-blue-500 \
												focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 \
												dark:focus:border-blue-500",
									}}
								/>
							</div>
							<div className="relative mb-2 md:mb-10">
								<h2>Kurs ändern:</h2>
								<Select
									primaryColor={"blue"} // Not Working
									placeholder={icsNameList.find((o) => o.value == userInf.ics_uid)?.label}
									isSearchable={true}
									value={selectedICS}
									onChange={handleChangeICS}
									options={icsNameList}
									loading={isLoading}
									classNames={{
										menuButton: () =>
											"flex bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 \
												dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 \
												dark:focus:border-blue-500",
										menu: "absolute z-10 w-full bg-gray-50 shadow-lg border rounded-lg border-gray-300 text-gray-900 focus:ring-blue-500 \
												focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 \
												dark:focus:border-blue-500",
										searchBox:
											"pl-8 bg-gray-50 w-full border border-gray-300 text-gray-900 rounded-lg p-2 dark:bg-gray-700 dark:border-gray-600 \
												dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
									}}
								/>
							</div>
							<h1 className="font-bold text-xl">Gespeicherte Adressen</h1>
							<h2>Adressen ändern:</h2>
							<Input_Settings
								name="address"
								id="address"
								type="text"
								placeholder="Adresse"
								in_cn="peer input mt-2 md:mt-2 dark:border-gray-500 pr-12 \
								disabled:bg-slate-50 dark:disabled:bg-gray-600 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none \
								dark:disabled:border-gray-700 dark:disabled:text-slate-700"
							/>
						</div>
					</div>
					<div className="flex justify-center space-x-10 pb-4 md:pb-8">
						<button onClick={() => onBtnSaveClick()} type="submit" className="button">
							Speichern
						</button>
						<button onClick={() => onBtnBackClick(false)} type="submit" className="button">
							Zurück
						</button>
					</div>
				</div>
			</div>
			<PopupSave
				isVisable={savePopupVisible}
				onClose={() => onClickPopSaveClose()}
				onSave={() => {
					onBtnSaveClick();
					onBtnBackClick(true);
				}}
				onDiscard={() => onBtnBackClick(true)}
			/>
			<PopupPasswordRequired isVisable={passwortPopupVisible} onClose={() => onClickPopPasswordClose()} />
			<PopupLoading isVisable={isLoading} />
		</body>
	);
}

function DummySettings() {
	return (
		<body className="h-screen">
			<div className="relative overflow-auto bg-cover bg-no-repeat h-full w-full text-center bg-landing m-auto object-none object-center">
				<div
					className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-auto bg-fixed"
					style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
				>
					<div className="relative top-[2%]">
						<h1 className="text-white font-bold text-7xl tracking-wider">Settings</h1>
					</div>
					<div className="flex w-full h-auto items-center justify-center">
						<div className="settings-box">
							<h1 className="font-bold text-xl">Account bearbeiten</h1>

							<Input_Settings name="username" id="username" type="username" placeholder="Username" />
							<Input_Settings name="identifier" id="email" type="identifier" placeholder="Email" />

							<Input_Settings name="text" id="firstname" type="text" placeholder="Vorname" />

							<Input_Settings name="text" id="surname" type="text" placeholder="Nachname" />

							<h2>Passwort ändern:</h2>
							<Input_Settings name="password" id="old_password" type="password" placeholder="Altes Passwort" />
							<Input_Settings name="password" id="new_password" type="password" placeholder="Neues Passwort" />
							<Input_Settings name="password" id="repeat_new_password" type="password" placeholder="Neues Passwort wiederholen" />

							<h1 className="font-bold text-xl">Standardeinstellungen</h1>
							<h2>Stadt ändern:</h2>
							<Input_Settings name="city" id="city" type="text" placeholder="Stadt" />

							<div className="relative mb-2 md:mb-10">
								<h2>Universität ändern:</h2>
								<Select
									primaryColor={"blue"} // Not Working
									placeholder="DHBW Mannheim"
									value={null}
									options={[{ value: "", label: "" }]}
									onChange={() => console.log()}
									classNames={{
										menuButton: () =>
											"flex bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 \
											dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 \
											dark:focus:border-blue-500",
										menu: "absolute z-10 w-full bg-gray-50 shadow-lg border rounded-lg border-gray-300 text-gray-900 focus:ring-blue-500 \
											focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 \
											dark:focus:border-blue-500",
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<PopupLoading isVisable={true} />
		</body>
	);
}

export default Settings;

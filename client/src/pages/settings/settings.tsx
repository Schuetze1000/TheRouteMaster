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
import { PopupSaveFailed } from "../../components/popups/save_failed";

//! Fixe Navbar Button zu Dashboard (Save Popup) @Leonidas-maker / @Schuetze1000

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

	const [stationsNameList, setStationsNameList] = useState<[{ value: string; label: string }]>([{ value: "", label: "" }]);
	const [selectedStations, setSelectedStations] = useState(null);
	const [selectedStationsValue, setSelectedStationsValue] = useState("");

	const [zip_city, setZip_City] = useState("");
	const [street_number, setStreet_Number] = useState("");

	const [inUsernameisDisabled, setInUsernameisDisabled] = useState(true);
	const [inEmailisDisabled, setInEmailisDisabled] = useState(true);
	const [inSurnameisDisabled, setInSurnameisDisabled] = useState(true);
	const [inFirstnameisDisabled, setInFirstnameisDisabled] = useState(true);

	const [inStateisDisabled, setInStateisDisabled] = useState(true);
	const [inCountryisDisabled, setInCountryisDisabled] = useState(true);
	const [inZipCityisDisabled, setInZipCityisDisabled] = useState(true);
	const [inStreetNumberisDisabled, setInStreetNumberisDisabled] = useState(true);

	const [passwordNeeded, setPasswordNeeded] = useState(false);

	const [profileChanged, setProfileChanged] = useState(false);
	const [configTrainChanged, setConfigTrainChanged] = useState(false);
	const [emailOrUsernameChanged, setEmailOrUsernameChanged] = useState(false);

	const [savePopupVisible, setSavePopupVisible] = useState(false);
	const [passwortPopupVisible, setPasswortPopupVisible] = useState(false);

	const [savePopupFailedVisible, setPopupFailedVisible] = useState(false);

	const [passwordShown, setPasswordShown] = useState(false);

	const [pswSVGx, setPswSVGx] = useState<number>(23);
	const [pswSVGy, setPswSVGy] = useState<number>(23);
	const [pswSVGr, setPswSVGr] = useState<number>(0);
	const [pswSVG, setPswSVG] = useState<string>(
		"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
	);

	function UpdateStations() {
		const streetNumber = getInputValue("street_number");
		const zipCity = getInputValue("zip_city");
		let ar_streetNumber = ["", ""];
		let ar_zipCity = ["", ""];
		if (zipCity) {
			if (zipCity.match("/[0-9]+,[A-Za-z]+/gm")) {
				ar_zipCity = getInputValue("zip_city").split(",");
			} else {
				console.error( "Missmatch!"); 
				return;
			}
		}
		if (streetNumber) {
			if (streetNumber.match("[A-Za-z. ]+,[0-9]+")) {
				ar_streetNumber = getInputValue("street_number").split(",");
				console.log(ar_streetNumber);
			} else {
				console.error( "Missmatch!"); 
				return;
			}
		}
		const address = `${ar_streetNumber[1]}+${ar_streetNumber[0]},${ar_zipCity[1]}+${ar_zipCity[0]}`;

		const test = {
			method: "GET",
			url: `https://nominatim.openstreetmap.org/search?addressdetails=1&polygon_geojson=1&format=json&q=${address}`,
		};
		axios(test).then((response) => {
			console.log(response);
		})
	}

	function togglePasswordVisiblity() {
		//! Bug fixen: Password Toggle wird immer angezeigz, auch an falscher Stell @Leonidas-maker
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
			setPswSVG(
				"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
			);
		}
	};

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

				setSelectedICSValue(tmpuserinf.ics_uid);
				setUserInf(tmpuserinf);
				if (tmpuserinf.homeaddress.zip && tmpuserinf.homeaddress.city) {
					setZip_City(`${tmpuserinf.homeaddress.zip}, ${tmpuserinf.homeaddress.city}`);
				}

				if (tmpuserinf.homeaddress.street && tmpuserinf.homeaddress.number) {
					setStreet_Number(`${tmpuserinf.homeaddress.street}, ${tmpuserinf.homeaddress.number}`);
				}

				UpdateStations();
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
		const email = getInputValue("email");
		const username = getInputValue("username");

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
				newEmail: email,
				password: password,
			},
		};

		axiosInstance(updateoption1)
			.then(() => {
				const updateoption2 = {
					method: "PUT",
					url: "/user/updateusername",
					headers: { Authorization: "Bearer " + getAccessToken() },
					withCredentials: true,
					data: {
						newUsername: username,
						password: password,
					},
				};
				axiosInstance(updateoption2).catch((error) => {
					if (error.response.status >= 400 && error.response.status < 500 && error.response.status != 418) {
						setPopupFailedVisible(true);
						//TODO Save failed animation @Leonidas-maker / @Schuetze1000
					}
				});
				setPasswordNeeded(false);
				(document.getElementById("password") as HTMLInputElement).value = "";
			})
			.catch((error) => {
				if (error.response.status >= 400 && error.response.status < 500 && error.response.status != 418) {
					setPopupFailedVisible(true);
					//TODO Save failed animation @Leonidas-maker / @Schuetze1000
				}
			});
	}
	function saveProfileChanges() {
		const streetNumber = getInputValue("street_number");
		const zipCity = getInputValue("zip_city");
		let ar_streetNumber = ["", ""];
		let ar_zipCity = ["", ""];
		if (zipCity) {
			if (zipCity.match("/[0-9]+,[A-Za-z]+/gm")) {
				ar_zipCity = getInputValue("zip_city").split(",");
			} else {
				throw "Missmatch!"; //TODO Focus input. Change Color of input @Leonidas-maker / @Schuetze1000
			}
		}
		if (streetNumber) {
			if (streetNumber.match("[A-Za-z. ]+,[0-9]+")) {
				ar_streetNumber = getInputValue("street_number").split(",");
				console.log(ar_streetNumber);
			} else {
				throw "Missmatch!"; //TODO Focus input. Change Color of input @Leonidas-maker / @Schuetze1000
			}
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
				setPopupFailedVisible(true);
				//TODO Save failed animation @Leonidas-maker / @Schuetze1000
			}
		});
	}

	function handleChangeUni(value) {
		setSelectedUni(value);
	}

	function handleChangeICS(value) {
		setProfileChanged(true);
		setSelectedICS(value);
		setSelectedICSValue(value.value);
	}

	function handleChangeStations(value) {
		setConfigTrainChanged(true);
		setSelectedStations(value);
		setSelectedStationsValue(value.value);
	}

	// ---------------------------------------------------------------------------------------------- //
	// ------------------------------------ Input-Fields Handler ------------------------------------ //
	// ---------------------------------------------------------------------------------------------- //
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

	function onClickCountry() {
		setProfileChanged(true);
		setInCountryisDisabled(false);
	}

	function onClickState() {
		setProfileChanged(true);
		setInStateisDisabled(false);
	}

	function onClickZipCity() {
		setProfileChanged(true);
		setInZipCityisDisabled(false);
	}

	function onClickStreetNumber() {
		setProfileChanged(true);
		setInStreetNumberisDisabled(false);
	}

	// ---------------------------------------------------------------------------------------------- //
	// --------------------------------------- Button Handler --------------------------------------- //
	// ---------------------------------------------------------------------------------------------- //
	function onBtnBackClick(force: boolean) {
		if ((!profileChanged && !emailOrUsernameChanged) || force) {
			navigate("/dashboard");
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
			if (profileChanged) {
				saveProfileChanges();
			}
			if (emailOrUsernameChanged) {
				saveEmailAndUsername();
			}

			setInEmailisDisabled(true);
			setInUsernameisDisabled(true);
			setInFirstnameisDisabled(true);
			setInSurnameisDisabled(true);

			setEmailOrUsernameChanged(false);
			setProfileChanged(false);
		} catch (error) {
			console.error(error);
		}
	}

	function onClickPopSaveClose() {
		setSavePopupVisible(false);
	}

	function onClickPopPasswordClose() {
		setPasswortPopupVisible(false);
	}

	function onClickPopFailedClose() {
		setPopupFailedVisible(false);
	}

	// ---------------------------------------------------------------------------------------------- //
	// ------------------------------------- Get nearby stations ------------------------------------ //
	// ---------------------------------------------------------------------------------------------- //

	/* const userAgent = 'the-routemaster.schuetz-andreas.dev'
	const client = createClient(dbProfile, userAgent)

	client.nearby({
		type: 'location',
		latitude: 52.5137344,
		longitude: 13.4744798
	}, {distance: 400})
	.then(console.log)
	.catch(console.error) */

	// ---------------------------------------------------------------------------------------------- //
	// -------------------------------------- Return Functions -------------------------------------- //
	// ---------------------------------------------------------------------------------------------- //
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
						<h1 className="text-white font-bold text-4xl md:text-7xl tracking-wider">Settings</h1>
					</div>
					<div className="flex w-full h-auto items-center justify-center">
						<div className="relative bg-white dark:bg-neutral-600 bg-opacity-100 rounded-lg w-[90%] h-full mx-auto p-10 mt-10 mb-5 shadow-2xl grid top-[8%] items-center">
							<h1 className="dark:text-white font-bold text-xl">Account bearbeiten</h1>

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
								type={passwordShown ? "text" : "password"}
								placeholder="Password required to change Username or Email!"
								value={""}
								isVisable={passwordNeeded}
								isDisabled={false}
								hasEditButton={false}
							/>
							<button className="absolute inset-y-0 right-0 bottom-5 top-5 flex items-center pr-3" onClick={togglePasswordVisiblity} type="button">
								<svg
									className="w-5 h-5 text-gray-500 dark:text-gray-400"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d={pswSVG} />
									<line x1="1" y1="1" x2={pswSVGx} y2={pswSVGy} />
									<circle cx="12" cy="12" r={pswSVGr} />
								</svg>
							</button>

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
							<button
								onClick={() => navigate("/settings/changepassword")}
								type="submit"
								className="inline-flex justify-center rounded-md bg-orange-600 px-5 py-2 text-sm \
								font-semibold text-white shadow-sm hover:bg-orange-500"
							>
								Passwort ändern?
							</button>

							<h1 className="font-bold text-xl dark:text-white py-3">Standardeinstellungen</h1>
							<h2 className="dark:text-white ">Wohnort ändern:</h2>
							<div className=" grid grid-cols-2 md:grid-cols-4 gap-x-6">
								<Input_Settings
									name="country"
									id="country"
									type="text"
									placeholder="Land"
									value={userInf.homeaddress.country}
									isDisabled={inCountryisDisabled}
									Click={onClickCountry}
								/>
								<Input_Settings
									name="state"
									id="state"
									type="text"
									placeholder="Bundesland"
									value={userInf.homeaddress.state}
									isDisabled={inStateisDisabled}
									Click={onClickState}
								/>

								<Input_Settings
									name="zip_city"
									id="city"
									type="text"
									placeholder="PLZ, Stadt"
									value={zip_city}
									isDisabled={inZipCityisDisabled}
									Click={onClickZipCity}
								/>

								<Input_Settings
									name="street_number"
									id="street_number"
									type="text"
									placeholder="Straße, Hausnummer"
									value={street_number}
									isDisabled={inStreetNumberisDisabled}
									Click={onClickStreetNumber}
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
							<div className="relative mb-2 md:mb-5">
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
							<div className="relative mb-2 md:mb-5">
								<h2>Standard Haltestelle in deiner nähe:</h2>
								<Select
									primaryColor={"blue"} // Not Working
									isSearchable={true}
									value={selectedStations}
									onChange={handleChangeStations}
									options={stationsNameList}
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
						</div>
					</div>
					<div className="flex justify-center space-x-10 pb-4 md:pb-8">
						<button onClick={onBtnSaveClick} type="submit" className="standard-button">
							Speichern
						</button>
						<button onClick={() => onBtnBackClick(false)} type="submit" className="standard-button">
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
			<PopupSaveFailed isVisable={savePopupFailedVisible} onClose={() => onClickPopFailedClose()} />
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

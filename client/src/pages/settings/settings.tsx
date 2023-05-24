import Navbar_settings from "../../components/navbars/Navbar_settings";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useColorMode from "../../hooks/useColorMode";
import Select from "react-tailwindcss-select";
import Input_Settings from "../../components/inputs/settings";

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
	const navigate = useNavigate();
	const [colorMode, setColorMode] = useColorMode();
	const [icsNameList, setICSNameList] = useState<[{ value: string; label: string }]>([{ value: "", label: "" }]);
	const [uniNameList, setUniNameList] = useState<[{ value: string; label: string }]>([{ value: "", label: "" }]);
	const [isLoading, setLoading] = useState(true);
	const [selectedICS, setSelectedICS] = useState(null);
	const [selectedUni, setSelectedUni] = useState(null);

	const [inUsernameisDisabled, setInUsernameisDisabled] = useState(true);
	const [inEmailisDisabled, setInEmailisDisabled] = useState(true);
	//const [inUsernameisDisabled, setInUsernameisDisabled] = useState(true);
	//const [inUsernameisDisabled, setInUsernameisDisabled] = useState(true);
	const [anythingChanged, setAnythingChanged] = useState(true);

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

	useEffect(() => {
		setUniNameList([{ value: "01", label: "DHBW Mannheim" }]);

		const optionsUser = {
			method: "GET",
			url: "/user/getuser",
			withCredentials: true,
		};
		axios(optionsUser)
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
				setLoading(false);
			})
			.catch((error) => {
				if (error.response.status >= 400 && error.response.status < 500) {
					//window.location.href = "/login";
				}
			});

		const optionsGetICS = {
			method: "GET",
			url: "/ics/getavailableics",
			withCredentials: true,
		};
		axios(optionsGetICS)
			.then((resAvailableIcs) => {
				var icsArray: [{ value: string; label: string }] = [{ label: resAvailableIcs.data[0].name, value: resAvailableIcs.data[0].uid }];
				for (let index = 1; index < resAvailableIcs.data.length; index++) {
					icsArray.push({ label: resAvailableIcs.data[index].name, value: resAvailableIcs.data[index].uid });
				}
				setICSNameList(icsArray);
			})
			.catch((error) => {
				if (error.response.status >= 400 && error.response.status < 500) {
					//window.location.href = "/login";
				}
			});
	}, []);

	const handleChangeUni = (value) => {
		setSelectedUni(value);
	};

	const handleChangeICS = (value) => {
		setSelectedICS(value);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	const saveAllChanges = () => {
		
	}

	const onClickUsername = () => {
		setAnythingChanged(true);
		setInUsernameisDisabled(false);
	}
	const onClickEmail = () => {
		setAnythingChanged(true);
		setInEmailisDisabled(false);
	}

	const onBtnBackClick = () => {
		if (!anythingChanged) {
			navigate("/");
		}
		else {
			//TODO: Save-Cancel-Popup @Leonidas-maker
		}
	}

	const onBtnSaveClick = () => {
		saveAllChanges();
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
							
							<Input_Settings name="username" id="username" type="username" placeholder="Username" value={userInf.username} isDisabled={inUsernameisDisabled} Click={onClickUsername}/>
							<Input_Settings name="identifier" id="identifier" type="identifier" placeholder="Email" value={userInf.email} isDisabled={inEmailisDisabled} Click={onClickEmail}/>

							<h2>Passwort ändern:</h2>
							<Input_Settings  name="password" id="old_password" type="password" placeholder="Altes Passwort" isDisabled={false} hasEditButton={false}/>
							<Input_Settings  name="password" id="new_password" type="password" placeholder="Neues Passwort" isDisabled={false} hasEditButton={false}/>
							<Input_Settings  name="password" id="repeat_new_password" type="password" placeholder="Neues Passwort wiederholen" isDisabled={false} hasEditButton={false}/>
							
							<h1 className="font-bold text-xl">Standardeinstellungen</h1>
							<h2>Stadt ändern:</h2>
							<Input_Settings  name="city" id="city" type="text" placeholder="Stadt" value={userInf.homeaddress.city}/>

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
							<Input_Settings  name="address" id="address" type="text" placeholder="Adresse" in_cn="peer input mt-2 md:mt-2 dark:border-gray-500 pr-12 \
								disabled:bg-slate-50 dark:disabled:bg-gray-600 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none \
								dark:disabled:border-gray-700 dark:disabled:text-slate-700"/>
						</div>
					</div>
					<div className="flex justify-center space-x-10 pb-4 md:pb-8">
						<button onClick={onBtnSaveClick} type="submit" className="button">
							Speichern
						</button>
						<button onClick={onBtnBackClick} type="submit" className="button">
							Zurück
						</button>
					</div>
				</div>
			</div>
		</body>
	);
}

export default Settings;

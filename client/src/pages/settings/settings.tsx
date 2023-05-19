import { useForm } from "../../hooks/useForm";
import Navbar_settings from "../../components/navbars/Navbar_settings";
import Back_landing from "../../components/buttons/Back_landing";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useColorMode from "../../hooks/useColorMode";

function Settings() {
	const navigate = useNavigate();
	const handleClick = () => navigate("/");
    const [colorMode, setColorMode] = useColorMode();
    const [icsnamelist, setICSNameList] = useState<string[][]>([]);

    useEffect(() => {
        try {
            const optionsGetICS = {
                method: "GET",
                url: "/ics/getavailableics",
            };
            var tmpArray:string[][] = [[""][""]];
            tmpArray[1].push("25");
            console.log(tmpArray);
            /*axios(optionsGetICS).then((resAvailableIcs) => {
                var tmpArray:string[][];
                for (let index = 0; index < resAvailableIcs.data.length; index++) {
                const setICSNameList[0]. = resAvailableIcs.data[index];
                
                }
                
            });*/
        } catch (error) {
            console.log(error);
        }
        
    }, []);

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
							<h2>Benutzernamen ändern:</h2>
							<div className="relative">
								<input className="peer input mb-2 md:mb-10" name="username" id="username" type="username" placeholder="Passwort" />
								<label
									htmlFor="username"
									className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 \
                                    transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] \
                                    peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 \
                                    peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none \
                                    dark:text-neutral-200 dark:peer-focus:text-primary"
								>
									Benutzername
								</label>
								<h2>Email Adresse ändern:</h2>
								<div className="relative">
									<input className="peer input mb-2 md:mb-10" name="identifier" id="identifier" type="identifier" placeholder="Email" />
									<label
										htmlFor="identifier"
										className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 \
                            transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] \
                            peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 \
                            peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none \
                            dark:text-neutral-200 dark:peer-focus:text-primary"
									>
										Email Adresse
									</label>
								</div>
								<h2>Passwort ändern:</h2>
								<div className="relative mb-3">
									<input className="peer input" name="password" id="password" type="password" placeholder="Altes Passwort" />
									<label
										htmlFor="identifier"
										className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 \
                            transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] \
                            peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 \
                            peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none \
                            dark:text-neutral-200 dark:peer-focus:text-primary"
									>
										Altes Passwort
									</label>
								</div>
								<div className="relative mb-3">
									<input className="peer input" name="password" id="password" type="password" placeholder="Neues Passwort" />
									<label
										htmlFor="identifier"
										className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 \
                            transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] \
                            peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 \
                            peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none \
                            dark:text-neutral-200 dark:peer-focus:text-primary"
									>
										Neues Passwort
									</label>
								</div>
								<div className="relative mb-3">
									<input className="peer input" name="password" id="password" type="password" placeholder="Neues Passwort wiederholen" />
									<label
										htmlFor="identifier"
										className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 \
                            transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] \
                            peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 \
                            peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none \
                            dark:text-neutral-200 dark:peer-focus:text-primary"
									>
										Neues Passwort wiederholen
									</label>
								</div>
								<h1 className="font-bold text-xl">Standardeinstellungen</h1>
								<h2>Stadt ändern:</h2>
								<div className="relative mb-3">
									<input className="peer input" name="city" id="city" type="text" placeholder="Stadt" />
									<label
										htmlFor="identifier"
										className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 \
                            transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] \
                            peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 \
                            peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none \
                            dark:text-neutral-200 dark:peer-focus:text-primary"
									>
										Stadt
									</label>
								</div>
                                <div className="relative mb-2 md:mb-10 mt-10">
                                    <h2>Universität ändern:</h2>
                                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Wähle dein Universität aus</option>
                                        <option value="DHBW_Mannheim">DHBW Mannheim</option>
                                    </select>
                                </div>
								<div className="relative mb-2 md:mb-10 mt-10">
                                    <h2>Kurs ändern:</h2>
                                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Wähle deinen Kurs aus</option>
                                        // Hier die ICS Namen einfügen
                                        <option value="DHBW_Mannheim">DHBW Mannheim</option>
                                    </select>
                                </div>
								<h1 className="font-bold text-xl">Gespeicherte Adressen</h1>
								<h2>Adressen ändern:</h2>
								<div className="relative mb-3">
									<input className="peer input" name="address" id="address" type="text" placeholder="Adresse" />
									<label
										htmlFor="identifier"
										className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 \
                            transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] \
                            peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 \
                            peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none \
                            dark:text-neutral-200 dark:peer-focus:text-primary"
									>
										Adresse
									</label>
								</div>
							</div>
						</div>
					</div>
					<div className="flex justify-center space-x-10 pb-8">
						<button
							type="submit"
							className="inline-block z-50 rounded-3xl hover:rounded-xl active:bg-green-700 active:text-white transition-all duration-300 cursor-pointer \
                        bg-green-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#14a44d] ease-in-out \
                        hover:bg-green-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 \
                        focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 \
                        active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] \
                        dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] \
                        +dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] \
                        dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
						>
							Speichern
						</button>
						<button
							onClick={handleClick}
							type="submit"
							className="inline-block z-50 rounded-3xl hover:rounded-xl active:bg-green-700 active:text-white transition-all duration-300 cursor-pointer \
                        bg-green-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#14a44d] ease-in-out \
                        hover:bg-green-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 \
                        focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 \
                        active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] \
                        dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] \
                        +dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] \
                        dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
						>
							Zurück
						</button>
					</div>
				</div>
			</div>
		</body>
	);
}

export default Settings;

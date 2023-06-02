import { useForm } from "../../hooks/useForm";
import Back_landing from "../../components/navbars/buttons/btn_BackLanding";
import axios from "axios";
import Navbar_credentials from "../../components/navbars/Navbar_credentials";
import ReCAPTCHA from "react-google-recaptcha";
import { useState, useEffect } from "react";
import { isLoggedIn } from "axios-jwt";
import { useNavigate } from "react-router";

let captchaRef;
let captchaReset = false;
function Registration() {
    const [passwordShown, setPasswordShown] = useState(false);

    const navigate = useNavigate();
    
    const [pswSVGx, setPswSVGx] = useState<number>(23);
    const [pswSVGy, setPswSVGy] = useState<number>(23);
    const [pswSVGr, setPswSVGr] = useState<number>(0);
    const [pswSVG, setPswSVG] = useState<string>("M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24");


    const initialState = {
        email: "",
        password: "",
    };

    const { onChange, onSubmit, values } = useForm(
        registerUserCallback,
        initialState,
    );

    useEffect(() => {
        if (isLoggedIn()) {
             navigate("/dashboard");
        }
     }, []);

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
    
    async function registerUserCallback() {
        const token = await captchaRef.executeAsync();
        const username_input = (document.getElementById('username') as HTMLInputElement | null)?.value;
        const email_input = (document.getElementById('email') as HTMLInputElement | null)?.value;
        const password_input = (document.getElementById('password') as HTMLInputElement | null)?.value;
        const repeat_password_input = (document.getElementById('repeat_password') as HTMLInputElement | null)?.value;
        if (repeat_password_input == password_input) {
            let options = {
                method: 'POST',
                url: "/auth/register",
                data: {
                    username : username_input,
                    email: email_input,
                    password: password_input,
                    reToken: token
                },
                withCredentials: true
            };
    
            await axios(options);
        }
        else {
            //! Password are not the same error
        }
    };

    const LoginButton = () => {
        const Click = () => {
            window.location.href = "/login";
        }
    
        return (
            <button
                type="button"
                onClick={Click}
                className="standard-button">
                zum Login
            </button>
        );
    };

    return (
        <body className="h-screen">
            <Navbar_credentials />
            <div
                className="relative overflow-hidden bg-cover bg-no-repeat h-full w-full text-center bg-landing m-auto object-none object-center">
            <Back_landing />
            <div
                className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
                style={{backgroundColor: "rgba(0, 0, 0, 0.8)"}}>
            <form onSubmit={onSubmit}>
                <div className="flex justify-center flex-col m-auto h-screen">
                    <div className="login-box">
                        <p className="text-center text-black text-3xl">Registration</p>
                        <div className="relative mb-3">
                            <input
                                className="peer input"
                                name="username"
                                id="username"
                                type="username"
                                placeholder="Benutzername"
                                onChange={onChange}
                                required
                            />
                            <label
                                htmlFor="username"
                                className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Benutzername
                            </label>
                        </div>

                        <div className="relative mb-3">
                            <input
                                className="peer input"
                                name="email"
                                id="email"
                                type="email"
                                placeholder="Email"
                                onChange={onChange}
                                required
                            />
                            <label
                                htmlFor="email"
                                className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Email Adresse
                            </label>
                        </div>

                        <div className="relative mb-3">
                            <input
                                className="peer input"
                                name="password"
                                id="password"
                                type={passwordShown ? "text" : "password"}
                                placeholder="Passwort"
                                onChange={onChange}
                                required
                            />

                            <label
                                htmlFor="password"
                                className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Passwort
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
                                className="peer input"
                                name="repeat_password"
                                id="repeat_password"
                                type={passwordShown ? "text" : "password"}
                                placeholder="Passwort wiederholen"
                                onChange={onChange}
                                required
                            />

                            <label
                                htmlFor="repeat_password"
                                className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Passwort wiederholen
                            </label>
                            <button className="absolute inset-y-0 right-0 top-5 bottom-5 flex items-center pr-3" onClick={togglePasswordVisiblity} type="button">
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

                        <ReCAPTCHA 
                            sitekey={process.env.REACT_APP_SITE_KEY} 
                            ref={e => captchaRef = e}
                            size="invisible" 
                            render="explicit"
                            id="captchaID"
                        />
                        <button
                            type="submit"
                            className="standard-button">
                            Registrieren
                        </button>
                        <p className="text-center text-blacm">Oder registriere dich mit deinem Google Account</p>
                        <button type="button" className="text-white bg-[#4285F4] rounded-3xl hover:rounded-xl duration-300 hover:bg-[#3271d8] focus:ring-4 focus:outline-none active:bg-[#235dbb] font-medium text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                        <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                        Mit Google registrieren
                        </button>
                        <p className="text-center text-black">Du hast bereits einen Account?</p>
                        <LoginButton/>
                    </div>
                </div>
            </form>
            </div>
            </div>
        </body>
    );
}

export default Registration;
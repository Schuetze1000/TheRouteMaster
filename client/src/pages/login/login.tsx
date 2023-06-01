import { useForm } from "../../hooks/useForm";
import Back_landing from "../../components/navbars/buttons/btn_BackLanding";
import axios from "axios";
import Navbar_credentials from "../../components/navbars/Navbar_credentials";
import ReCAPTCHA from "react-google-recaptcha";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { setAuthTokens, isLoggedIn } from "axios-jwt";

function Login() {

    const [passwordShown, setPasswordShown] = useState(false);
    const navigate = useNavigate();
    let captchaRef;

    const initialState = {
        email: "",
        password: "",
    };

    const { onChange, onSubmit, values } = useForm(
        loginUserCallback,
        initialState,
    );

    useEffect(() => {
       if (isLoggedIn()) {
            navigate("/settings");
       }
    }, []);
    
    async function loginUserCallback() {
        var token = ""
        if (!captchaRef.getValue()) {
            token = await captchaRef.executeAsync();
        }
        else {
            await captchaRef.reset();
            token = await captchaRef.executeAsync();
        }
        const identifier_input = (document.getElementById('identifier') as HTMLInputElement | null)?.value;
        const password_input = (document.getElementById('password') as HTMLInputElement | null)?.value;
        let options = {
            method: 'POST',
            url: "/auth/login",
            data: {
                identifier: identifier_input,
                password: password_input,
                reToken: String(token)
            },
            withCredentials: true
        };
        await axios(options).then((response) => {
            setAuthTokens({
                accessToken: response.data.token,
                refreshToken: response.data.refreshToken
              });
              navigate("/settings");
        }).catch((error) => {
            if (error.response.status >= 400 && error.response.status < 500) {
                console.log(error);
            }
        });
    };

    const RegistrationButton = () => {
        const Click = () => {
            window.location.href = "/registration";
        }
    
        return (
            <button
                type="button"
                onClick={Click}
                className="standard-button">
                Registrieren
            </button>
        );
    };

    const togglePassword = () => {
        setPasswordShown(!passwordShown); //TODO Implement @Leonidas-maker
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
                        <p className="text-center text-black text-3xl">Bitte melde dich mit deiner Email an</p>
                        <div className="relative mb-3">
                            <input
                                className="peer input"
                                name="identifier"
                                id="identifier"
                                type="identifier"
                                placeholder="Email"
                                onChange={onChange}
                                required
                            />
                            <label
                                htmlFor="identifier"
                                className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Email Adresse/Benutzername
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
                        <a href="/forgot-password" className="underline">Passwort vergessen</a>
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
                            Login
                        </button>
                        <p className="text-center text-blacm">Oder melde dich mit deinem Google Account an</p>
                        <button type="button" className="text-white bg-[#4285F4] rounded-3xl hover:rounded-xl duration-300 hover:bg-[#3271d8] focus:ring-4 focus:outline-none active:bg-[#235dbb] font-medium text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                        <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                        Mit Google anmelden
                        </button>
                        <p className="text-center text-black">Du hast noch keinen Account?</p>
                        <RegistrationButton/>
                    </div>
                </div>
            </form>
            </div>
            </div>
        </body>
    );
}

export default Login;
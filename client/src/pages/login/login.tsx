import { useForm } from "../../hooks/useForm";
import Back_landing from "../../components/navbars/buttons/btn_BackLanding";
import axios from "axios";
import Navbar_credentials from "../../components/navbars/Navbar_credentials";
import ReCAPTCHA from "react-google-recaptcha";
import { useState, useEffect } from "react";
import { useHref, useNavigate } from 'react-router-dom';
import { setAuthTokens, isLoggedIn } from "axios-jwt";
import { PopupFalseCred } from "../../components/popups/credentials_false";
import { useTranslation } from "react-i18next";

function Login() {

    const { t } = useTranslation();

    const [passwordShown, setPasswordShown] = useState(false);
    const navigate = useNavigate();
    let captchaRef;

    const [identifierError, setIdentifierError] = useState(false);
    const [CredError, setCredError] = useState(false);

    const [pswSVGx, setPswSVGx] = useState<number>(23);
    const [pswSVGy, setPswSVGy] = useState<number>(23);
    const [pswSVGr, setPswSVGr] = useState<number>(0);
    const [pswSVG, setPswSVG] = useState<string>("M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24");


    const initialState = {
        email: "",
        password: "",
    };

    function onLoginClick() {
        setIdentifierError(true);
    }

    function onCredClick() {
        setCredError(false);
        window.location.href = "/login";
    }

    const { onChange, onSubmit, values } = useForm(
        loginUserCallback,
        initialState,
    );

    useEffect(() => {
       if (isLoggedIn()) {
            navigate("/dashboard");
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
              navigate("/dashboard");
        }).catch((error) => {
            if (error.response.status >= 400 && error.response.status < 500) {
                setCredError(true);
            }
        });
    };

    const onGithubClick = () => {
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    }

    const RegistrationButton = () => {
        const Click = () => {
            window.location.href = "/registration";
        }
    
        return (
            <button
                type="button"
                onClick={Click}
                className="standard-button">
                {t("registration_btn")}
            </button>
        );
    };

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
                        <p className="text-center text-black text-3xl">{t("login_txt")}</p>
                        <div className="relative mb-3">
                            <input
                                className={`peer input ${identifierError ? "invalid:border-red-500" : ""}`}
                                name="identifier"
                                id="identifier"
                                type="identifier"
                                placeholder="Email"
                                onChange={onChange}
                                required
                            />
                            <label
                                htmlFor="identifier"
                                className="input-text">{t("login_lbl")}
                            </label>
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
                                className="input-text">{t("password_txt")}
                            </label>
                            <button className="absolute inset-y-0 right-0 bottom-5 flex items-center pr-3" onClick={togglePasswordVisiblity} type="button">
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
                        <a href="/forgot-password" className="hover:underline hover:text-gray-700 active:text-gray-500">{t("forgot_password")}</a>
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
                            onClick={onLoginClick}
                            className="standard-button">
                            {t("login_btn")}
                        </button>
                        <p className="text-center text-blacm">{t("github_login")}</p>
                        <button type="button" onClick={onGithubClick} className="text-white bg-[#24292F] rounded-3xl hover:rounded-xl duration-300 hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                            <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
                            {t("github_signin")}
                        </button>
                        <p className="text-center text-black">{t("no_account")}</p>
                        <RegistrationButton/>
                    </div>
                </div>
            </form>
            </div>
            </div>
            <PopupFalseCred 
                isVisable={CredError} 
                onClose={onCredClick} />
        </body>
    );
}

export default Login;
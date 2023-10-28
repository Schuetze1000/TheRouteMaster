import { useForm } from "../../hooks/useForm";
import Back_landing from "../../components/navbars/buttons/btn_BackLanding";
import Navbar_credentials from "../../components/navbars/Navbar_credentials";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";

function Forgot_password() {
    let captchaRef;

    const { t } = useTranslation();

    const initialState = {
        email: "",
        password: "",
    };

    const { onChange, onSubmit, values } = useForm(
        forgotPassword,
        initialState,
    );

    function getInputValue(id: string): string {
		try {
			const value: string = (document.getElementById(id) as HTMLInputElement).value;
			return value;
		} catch {
			return "";
		}
	}

    async function forgotPassword() {
        const email = getInputValue("identifier");

        const forgot_password = {
            method: "POST",
            url: "/auth/forgotpassword",
            data: {
                email: email
            },
        };
    }

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
                        <p className="text-center text-black text-3xl">{t("password_reset")}</p>
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
                                className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">{t("email_reset")}
                            </label>
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
                            className="standard-button"
                            onClick={forgotPassword}>
                            {t("submit_reset")}
                        </button>
                    </div>
                </div>
            </form>
            </div>
            </div>
        </body>
    );
}

export default Forgot_password;
import { useForm } from "../../hooks/useForm";
import Back_landing from "../../components/navbars/buttons/btn_BackLanding";
import Navbar_credentials from "../../components/navbars/Navbar_credentials";
import ReCAPTCHA from "react-google-recaptcha";

function Forgot_password() {
    let captchaRef;

    const initialState = {
        email: "",
        password: "",
    };

    const { onChange, onSubmit, values } = useForm(
        loginUserCallback,
        initialState,
    );
    
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
                        <p className="text-center text-black text-3xl">Gib deine Email Adresse ein um dein Passwort zurück zu setzen</p>
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
                                className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Email Adresse
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
                            className="inline-block rounded-3xl hover:rounded-xl active:bg-green-700 active:text-white transition-all duration-300 cursor-pointer bg-green-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#14a44d] ease-in-out hover:bg-green-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]">
                            Absenden
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
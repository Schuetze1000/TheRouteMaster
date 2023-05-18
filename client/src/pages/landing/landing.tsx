import Navbar_landing from "../../components/Navbar_landing";
import DarkMode_switch from "../../components/DarkMode_switch";
import Weather from '../../components/weather';

function Landing() {
    const LoginButton = () => {
        const Click = () => {
            window.location.href = "/login";
        }
    
        return (
            <button
                type="button"
                onClick={Click}
                className="rounded-3xl hover:rounded-xl hover:border-neutral-400 hover:bg-neutral-600 hover:bg-opacity-70 active:border-neutral-600 active:bg-neutral-800 active:duration-100 transition-all duration-300 ease-linear cursor-pointer border-2 border-neutral-50 px-7 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal text-neutral-50  dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 shadow-lg">
                Anmelden
            </button>
        );
    };

    const RegistrationButton = () => {
        const Click = () => {
            window.location.href = "/registration";
        }
    
        return (
            <button
                type="button"
                onClick={Click}
                className="rounded-3xl hover:rounded-xl hover:border-neutral-400 hover:bg-neutral-600 hover:bg-opacity-70 active:border-neutral-600 active:bg-neutral-800 active:duration-100 transition-all duration-300 ease-linear cursor-pointer border-2 border-neutral-50 px-7 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal text-neutral-50  dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 shadow-lg">
                Registrieren
            </button>
        );
    };

    return (
        <body className="h-screen">
            <Navbar_landing />
            <div className="absolute top-0 left-2 z-50">
                <DarkMode_switch />
            </div>
            <div className="absolute -top-14 left-3/4 z-50">
                <Weather/>
            </div>
            <div
                className="relative overflow-hidden bg-cover bg-no-repeat h-full w-full text-center bg-landing m-auto object-none object-center">
                <div
                    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
                    style={{backgroundColor: "rgba(0, 0, 0, 0.6)"}}>
                    <div className="flex h-full items-center justify-center">
                        <div className="text-white">
                            <h2 className="mb-4 text-4xl font-semibold">Willkommen bei The Route Master</h2>
                            <h4 className="mb-6 text-xl font-semibold">Beginne noch heute deinen Tag effizienter zu gestalten</h4>
                            <div className="space-x-5">
                                <LoginButton />
                                <RegistrationButton />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default Landing;
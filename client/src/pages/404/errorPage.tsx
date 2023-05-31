import Navbar_landing from "../../components/navbars/Navbar_landing";
import DarkMode_switch from "../../components/navbars/buttons/btn_DarkModeSwitch";
import Weather from "../../components/weather";
import React from "react";

function ErrorPage() {

    return (
        <body className="h-screen">
            <div className="absolute top-0 left-2 z-50">
            </div>
            <div className="absolute -top-[4.5em] sm:-top-14 right-2 sm:right-6 z-50">
            </div>
            <div
                className="relative overflow-hidden bg-cover bg-no-repeat h-full w-full text-center bg-landing m-auto object-none object-center">
                <div
                    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
                    style={{backgroundColor: "rgba(0, 0, 0, 0.6)"}}>
                    <div className="flex h-full items-center justify-center">
                        <div className="text-white">
                            <p>Error 418</p>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default ErrorPage;
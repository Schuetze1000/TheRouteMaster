import React, { useEffect } from "react";
import Navbar_dashboard from "../../components/navbars/Navbar_dashboard";
import Map from "../../components/map/map";
import FullCalendarApp from "../../components/calendar/calendar";
import Weather from "../../components/weather";
import { isLoggedIn } from "axios-jwt";

function Dashboard() {

    useEffect(() => {
        if (!isLoggedIn()) {
            window.location.href = "/login";
        }
    }, []);

    return (
        <body className="h-screen">
        <Navbar_dashboard />
        <div className="relative overflow-auto bg-cover bg-no-repeat h-full w-full text-center bg-landing m-auto object-none object-center">
            <div
                className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-auto bg-fixed"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
                <div className="relative top-[2%]">
                    <h1 className="text-white font-bold text-7xl tracking-wider">Dashboard</h1>
                </div>
                <div className="flex w-full h-auto items-center justify-center">
                    <div className="background-box">
                        <div className="space-y-10 z-10">
                        <div className="relative">
                                <Weather />
                            </div>
                            <div className="relative">
                                <FullCalendarApp />
                            </div>
                            <div className="relatve flex">
                                <Map />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    );
}

export default Dashboard;
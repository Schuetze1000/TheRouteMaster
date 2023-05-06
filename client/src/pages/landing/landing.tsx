import React, { useState } from "react";
import LoginButton from '../../components/LoginButton'
import Navbar from "../../components/Navbar";

function Landing() {
    return (
        <body className="h-screen bg-theme-1-1">
            <div>
                <Navbar />
                <h1 className="text-center text-red-700">Willkommen zu The Route Master!</h1>
                <LoginButton/>
            </div>
        </body>
    );
}

export default Landing;
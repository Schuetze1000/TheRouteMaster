import React, { useState } from "react";
import LoginButton from '../../components/LoginButton'
import Navbar from "../../components/Navbar";

function Landing() {

    return (
        <div className="flex">
            <Navbar />
            <LoginButton/>
        </div>
    );
}

export default Landing;
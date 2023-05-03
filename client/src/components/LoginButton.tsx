import React from "react";
import { useNavigator } from "react-router-dom";

const LoginButton = () => {
    const navigate = useNavigator();
    const handleClick = () => navigate("/login");

    return (
        <button type="button" onClick={handleClick}>
            Zum Login
        </button>
    );
};

export default LoginButton
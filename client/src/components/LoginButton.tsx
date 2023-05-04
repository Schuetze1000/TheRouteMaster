import React from "react";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
    const navigate = useNavigate();
    const handleClick = () => navigate("/login");

    return (
        <button type="button" onClick={handleClick}>
            Zum Login
        </button>
    );
};

export default LoginButton
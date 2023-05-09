import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import Navbar from "../../components/Navbar";

function Login() {
    const initialState = {
        email: "",
        password: "",
    };

    const { onChange, onSubmit, values } = useForm(
        loginUserCallback,
        initialState,
    );

    async function loginUserCallback() {
        // sendet "values" zur Datenbank
    }

    return (
        <body className="h-screen bg-gray-600">
            <form onSubmit={onSubmit}>
                <Navbar/>
                <div className="flex justify-center flex-col m-auto h-screen">
                    <div className="login-box">
                        <p className="text-center text-white text-3xl">Bitte melde dich an</p>
                        <input
                            className="email-input"
                            name="email"
                            id="email"
                            type="email"
                            placeholder="Email"
                            onChange={onChange}
                            required
                        />

                        <input
                            className="password-input"
                            name="password"
                            id="password"
                            type="password"
                            placeholder="Password"
                            onChange={onChange}
                            required
                        />
                        <button className="login-button" type="submit">Login</button>
                        <p className="text-center text-white">Du hast noch keinen Account?</p>
                        <button  className="register-button" type="submit">Register</button>
                    </div>
                </div>
            </form>
        </body>
    );
}

export default Login;
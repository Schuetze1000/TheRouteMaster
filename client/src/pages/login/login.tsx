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
        <body className="h-screen bg-theme-1-1">
            <form onSubmit={onSubmit}>
                <Navbar/>
                <div className="grid gap-4 h-56 grid-cols-2 content-evenly mx-96">
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
                    <button  className="register-button" type="submit">Register</button>
                </div>
            </form>
        </body>
    );
}

export default Login;
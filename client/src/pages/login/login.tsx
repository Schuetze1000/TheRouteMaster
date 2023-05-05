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
        <form onSubmit={onSubmit}>
            <Navbar/>
            <div>
                <input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Email"
                    onChange={onChange}
                    required
                />

                <input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Password"
                    onChange={onChange}
                    required
                />
                <button type="submit">Login</button>
                <br></br>
                <button type="submit">Register</button>
            </div>
        </form>
    );
}

export default Login;
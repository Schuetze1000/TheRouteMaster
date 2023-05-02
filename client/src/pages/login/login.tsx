import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";

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
            </div>
        </form>
    );
}

export default Login;
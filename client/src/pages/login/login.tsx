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
                        <div className="relative mb-3">
                            <input
                                className="peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                name="email"
                                id="email"
                                type="email"
                                placeholder="Email"
                                onChange={onChange}
                                required
                            />
                            <label
                                htmlFor="email"
                                className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Email Adresse
                            </label>
                        </div>

                        <div className="relative mb-3">
                            <input
                                className="peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                name="password"
                                id="password"
                                type="password"
                                placeholder="Passwort"
                                onChange={onChange}
                                required
                            />

                            <label
                                htmlFor="password"
                                className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Passwort
                            </label>
                        </div>

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
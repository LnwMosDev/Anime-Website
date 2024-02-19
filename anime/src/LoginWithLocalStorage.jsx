import React, { useRef } from "react";
import Admin from "./component/Admin";
import "tailwindcss/tailwind.css";

function LoginWithLocalStorage() {
    const email = useRef();
    const password = useRef();
    const getEmail = localStorage.getItem("emailData");
    const getPassword = localStorage.getItem("passwordData");

    const handleSubmit = () => {
        if (email.current.value === "admin" && password.current.value === "12345") {
            localStorage.setItem("emailData", "admin");
            localStorage.setItem("passwordData", "12345");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            {
                getEmail && getPassword ? (
                    <Admin />
                ) : (
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md border">
                        <p className="text-xl font-semibold mb-4">Admin Login</p>
                        <div className="mb-4">
                            <input
                                type="text"
                                ref={email}
                                className="border rounded w-full py-2 px-3"
                                placeholder="Email"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                ref={password}
                                className="border rounded w-full py-2 px-3"
                                placeholder="Password"
                            />
                        </div>
                        <div className="flex justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 text-white font-bold py-2 px-4 rounded  "
                            type="submit"
                        >
                            Login
                        </button>
                        </div>
                    </form>
                )
            }
        </div>
    );
}

export default LoginWithLocalStorage;

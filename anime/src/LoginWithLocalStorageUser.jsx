import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserRegisterModal from "./UserRegisterModal";
import "tailwindcss/tailwind.css";

function LoginWithLocalStorageUser() {
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();

    const [showSignUpForm, setShowSignUpForm] = useState(false);
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // New state variable

    useEffect(() => {
        const storedUsers = localStorage.getItem("RegisteredUsers");
        const loggedInUser = localStorage.getItem("LoggedInUser");

        if (storedUsers) {
            setRegisteredUsers(JSON.parse(storedUsers));
        }

        if (loggedInUser) {
            setIsLoggedIn(true);
            navigate("/Users");
        }
    }, [navigate]);

    const handleSubmit = () => {
        const enteredEmail = email.current.value;
        const enteredPassword = password.current.value;
    
        const userFound = registeredUsers.find(
            (user) => user.email === enteredEmail && user.password === enteredPassword
        );
    
        if (userFound) {
            const loggedInUser = {
                name: userFound.name,
                email: userFound.email,
                password: userFound.password,
            };
    
            localStorage.setItem("LoggedInUser", JSON.stringify(loggedInUser));
            setIsLoggedIn(true);
    
            // Show success message and delay navigation
         
                alert("Login successful!");
                navigate("/Users");
         
        } else {
            // Show error message
            alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        }
    };

    const handleSignUp = (newUser) => {
        setRegisteredUsers((prevUsers) => [...prevUsers, newUser]);
        localStorage.setItem(
            "RegisteredUsers",
            JSON.stringify([...registeredUsers, newUser])
        );
    };

    const handleSignUpClick = () => {
        setShowSignUpForm(true);
    };

    const handleCloseModal = () => {
        setShowSignUpForm(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            {!isLoggedIn && ( // Render the login form only if not logged in
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md border">
                    <p className="text-xl font-semibold mb-4">User Login</p>
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
                        className="bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 text-white font-bold py-2 px-4 rounded "
                        type="submit"
                    >
                        Login
                    </button>
                    </div>
                    <div className="flex justify-center">
                    {!showSignUpForm && (
                        <button
                            className="text-blue-500 mt-2 underline"
                            type="button"
                            onClick={handleSignUpClick}
                        >
                            สมัครสมาชิก
                        </button>
                    )}
                    </div>
                    
                    {showSignUpForm && <UserRegisterModal isOpen={showSignUpForm} onClose={handleCloseModal} onSignUp={handleSignUp} />}
                </form>
            )}
        </div>
    );
}

export default LoginWithLocalStorageUser;

import React, { useState, useEffect } from 'react';

function UserRegisterModal({ isOpen, onClose }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    useEffect(() => {
        const storedUsers = localStorage.getItem("RegisteredUsers");

        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        }
    }, []);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const [emailError, setEmailError] = useState("");
    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newEmail)) {
            setEmailError("Invalid email format");
        } else {
            setEmailError("");
        }
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!emailError) { // เพิ่มเงื่อนไขตรวจสอบความถูกต้องของอีเมล
            const userData = {
                name,
                email,
                password
            };

            const newUsersArray = [...users, userData];

            localStorage.setItem("RegisteredUsers", JSON.stringify(newUsersArray));

            setUsers(newUsersArray);
            setRegistrationSuccess(true);

            setTimeout(() => {
                setRegistrationSuccess(false);
                onClose();
                window.location.reload();
            }, 1500);
        }
    };
    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-md flex flex-col ">
                <h2 className="text-xl font-semibold mb-4">Register Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            className="border rounded py-2 px-3"
                            placeholder="Name"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            className={`border rounded py-2 px-3 ${emailError ? "border-red-500" : ""}`}
                            placeholder="Email"
                        />
                        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="border rounded py-2 px-3"
                            placeholder="Password"
                        />
                    </div>
                    {registrationSuccess && (
                        <div className="mb-4 text-green-600">สมัครสำเร็จ กำลังกลับหน้า Login</div>
                    )}
                    <div className='flex justify-center'>
                        {!registrationSuccess && (

                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Register
                            </button>
                        )}
                    </div>
                </form>
                {!registrationSuccess && (
                    <button onClick={onClose} className="text-gray-500 mt-2 inline-block underline" type="button">
                        Close
                    </button>
                )}
            </div>
        </div>
    );
}

export default UserRegisterModal;

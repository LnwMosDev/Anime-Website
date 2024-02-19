import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Users() {
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const storedLoggedInUser = localStorage.getItem("LoggedInUser");

        if (storedLoggedInUser) {
            setLoggedInUser(JSON.parse(storedLoggedInUser));
        } else {
            navigate("/LoginWithLocalStorageUser"); // ถ้าไม่ได้ล็อกอิน ให้ Navigate กลับไปหน้า Login
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("LoggedInUser");
        navigate("/LoginWithLocalStorageUser");
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md border">
                <div className="flex items-center mb-4">
                    <FaUser className="text-3xl mr-2 h-40 w-40" />
                </div>
                <p className="text-3xl font-semibold">Users</p>
                {loggedInUser && (
                    <div className="mb-4">
                        <p>Welcome, {loggedInUser.name}!</p>
                        <p>Email: {loggedInUser.email}</p>
                        <p>Password: {loggedInUser.password}</p>
                    </div>
                )}
                <div className="flex justify-end">
                    <button
                        className='bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 px-4'
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Users;

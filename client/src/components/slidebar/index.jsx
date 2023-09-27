import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(() => location.pathname.split("/")[2] || "");

    return (
        <div className="bg-green-500 text-white p-4 rounded-md">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-extrabold">GestAddress</h1>
                <div className="flex space-x-4">
                    <MenuItem
                        link=""
                        title={"Dashboard"}
                        activeLink={activeLink}
                        setActiveLink={setActiveLink}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            {/* ... Icône Dashboard */}
                        </svg>
                    </MenuItem>
                    <MenuItem
                        link="Contacts"
                        title={"Contacts"}
                        activeLink={activeLink}
                        setActiveLink={setActiveLink}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            {/* ... Icône Contacts */}
                        </svg>
                    </MenuItem>
                    
                    <MenuItem
                        link="users"
                        title={"Utilisateurs"}
                        activeLink={activeLink}
                        setActiveLink={setActiveLink}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            {/* ... Icône Utilisateurs */}
                        </svg>
                    </MenuItem>

                    <MenuItem>
                    </MenuItem>
                </div>
            </div>
        </div>
    );
}

const MenuItem = ({ title, link, children, activeLink, setActiveLink }) => {
    const isActive = activeLink === link;

    return (
        <Link to={link} onClick={() => setActiveLink(link)}>
            <div
                className={`flex items-center space-x-2 py-2 px-2 hover:bg-green-300 rounded-md hover:text-green-50 text-gray-700 cursor-pointer ${
                    isActive ? "bg-green-500 rounded-md text-green-50" : ""
                }`}
            >
                <div className="w-6 h-6 rounded-full">{children}</div>
                <h1 className="text-md font-medium">{title}</h1>
            </div>
        </Link>
    );
};

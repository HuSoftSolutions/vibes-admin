import React, { useState } from "react";
import Businesses from "./Businesses";
import { MdArrowForward, MdArrowBack } from "react-icons/md";

function AdminPanel() {
    const [activeSection, setActiveSection] = useState("businesses");
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                className={`${
                    isOpen ? 'w-64' : 'w-0'
                } bg-gray-800 text-white transition-all duration-300 ease-in-out overflow-hidden lg:w-64`}
            >
                <div className="flex flex-col p-4">
                    <div className="text-lg font-semibold mb-4">Admin Panel</div>
                    <nav className="flex flex-col space-y-2">
                        {/* Navigation Links */}
                        <a
                            href="#businesses"
                            onClick={() => setActiveSection("businesses")}
                            className="text-gray-300 hover:text-white"
                        >
                            Businesses
                        </a>
                        {/* Add more navigation links as needed */}
                    </nav>
                </div>
            </div>
            <div className="flex-1 p-4 overflow-y-scroll">
                {/* Mobile Sidebar Toggle Button */}
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden text-white bg-gray-800 p-2 rounded mb-4"
                >
                    {isOpen ? <MdArrowBack /> : <MdArrowForward />}
                </button>
                {activeSection === "businesses" && <Businesses />}
                {/* ... other sections */}
            </div>
        </div>
    );
}

export default AdminPanel;

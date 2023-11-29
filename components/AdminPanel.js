import Businesses from "./Businesses";
import React, {useState} from 'react';

// components/AdminPanel.js
function AdminPanel() {
	const [activeSection, setActiveSection] = useState('businesses');

  return (
		<div className="flex h-screen bg-gray-100">
		{/* Sidebar */}
		<div className="w-64 bg-gray-800 text-white">
				<div className="flex flex-col p-4">
						<div className="text-lg font-semibold mb-4">Admin Panel</div>
						<nav className="flex flex-col space-y-2">
								{/* <a href="#dashboard" className="text-gray-300 hover:text-white">Dashboard</a> */}
								{/* <a href="#users" className="text-gray-300 hover:text-white">Users</a> */}
                <a href="#businesses" onClick={() => setActiveSection('businesses')} className="...">Businesses</a>

								{/* Add more navigation links as needed */}
						</nav>
				</div>
		</div>
		<div className="flex-1 p-4  overflow-y-scroll">
                {activeSection === 'businesses' && <Businesses />}
                {/* ... other sections */}
            </div>        </div>
	);
}

export default AdminPanel;
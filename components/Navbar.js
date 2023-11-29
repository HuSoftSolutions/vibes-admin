"use client"

import React from "react";
import { useAuth } from "../hooks/useAuth"; // Adjust the path as needed

const Navbar = () => {
  const { user, signout } = useAuth();

  const handleSignOut = async () => {
    try {
      await signout();
      // Redirect or perform additional actions upon successful sign-out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
		<nav className="bg-gray-800 text-white p-4">
		<div className=" mx-auto flex justify-between items-center">
				<div className="text-lg font-semibold">Vibes 312 Admin Panel</div>
				{user && (
						<div className="flex items-center space-x-4">
								<span>Welcome, {user.email}</span>
								<button 
										onClick={handleSignOut} 
										className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
								>
										Sign Out
								</button>
						</div>
				)}
		</div>
</nav>
  );
};

export default Navbar;

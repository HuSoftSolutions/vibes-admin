"use client"

// app/page.js
import Image from 'next/image';
import { useAuth } from '../hooks/useAuth';
import Login from '../components/Login';
import Unauthorized from '../components/Unauthorized';
import AdminPanel from '../components/AdminPanel';

export default function Home() {
  const { user } = useAuth();

  if (!user) {
    // User not signed in, show login component
    return <Login />;
  } else if (!user.admin) {
    // User is not an admin, show unauthorized component
    return <Unauthorized />;
  }

  // User is an admin, show the admin panel
  return <AdminPanel />;
}

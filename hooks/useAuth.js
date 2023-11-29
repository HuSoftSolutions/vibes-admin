"use client"

import { useState, useEffect, useContext, createContext } from 'react';
import { auth, db } from '../firebaseConfig';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// Create a context
const authContext = createContext();

// Provider component that wraps your app and makes auth object available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useState(null);

    // Subscribe to user on mount
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const userDocRef = doc(db, 'users', firebaseUser.uid);
                const userDoc = await getDoc(userDocRef);

                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    ...userDoc.data()
                });
            } else {
                setUser(false);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    // Sign in method
    const signin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Sign out method
    const signout = () => {
        return signOut(auth);
    };

    // Return the user object and auth methods
    return {
        user,
        signin,
        signout
    };
}

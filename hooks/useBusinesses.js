import { useState, useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Adjust the path as needed

const useBusinesses = () => {
    const [businesses, setBusinesses] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'businesses'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const businessesArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setBusinesses(businessesArray);
        });

        return () => unsubscribe();
    }, []);

    return businesses;
};

export default useBusinesses;

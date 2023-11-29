import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { storage, db } from '../firebaseConfig'; // Adjust the path as needed

const useManageBusiness = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const uploadPhoto = async (photoFile) => {
        if (!photoFile) return null;
        try {
            setIsLoading(true);
            const photoRef = ref(storage, `business_photos/${photoFile.name}`);
            await uploadBytes(photoRef, photoFile);
            return await getDownloadURL(photoRef);
        } catch (err) {
            setError(err);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const saveBusiness = async (business, photoFile) => {
        try {
            setIsLoading(true);
            const photoUrl = await uploadPhoto(photoFile);
            const businessData = photoUrl ? { ...business, photoUrl } : business;

            const businessDocRef = doc(db, 'businesses', businessData.id);
            await updateDoc(businessDocRef, businessData);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    return { saveBusiness, isLoading, error };
};

export default useManageBusiness;

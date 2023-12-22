// hooks/useCategories.js
import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'categories'));
            const fetchedCategories = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCategories(fetchedCategories);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const addCategory = async (title, value) => {
        if (categories.some(category => category.value === value)) {
            setError(new Error('Category with this name already exists'));
            return;
        }

        try {
            await addDoc(collection(db, 'categories'), { title, value });
            fetchCategories();
        } catch (err) {
            setError(err);
        }
    };

    const editCategory = async (id, title, value) => {
        if (categories.some(category => category.value === value && category.id !== id)) {
            setError(new Error('Category with this name already exists'));
            return;
        }

        try {
            const docRef = doc(db, 'categories', id);
            await updateDoc(docRef, { title, value });
            fetchCategories();
        } catch (err) {
            setError(err);
        }
    };

    const deleteCategory = async (id) => {
        try {
            const docRef = doc(db, 'categories', id);
            await deleteDoc(docRef);
            fetchCategories();
        } catch (err) {
            setError(err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return { categories, addCategory, editCategory, deleteCategory, loading, error };
};

export default useCategories;

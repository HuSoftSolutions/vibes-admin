import React, { useState } from "react";
import useBusinesses from "../hooks/useBusinesses";
import useManageBusiness from "../hooks/useManageBusiness"; // Import the custom hook
import useCategories from '../hooks/useCategories'; // Import the custom hook
import { MdEdit } from "react-icons/md";
import Image from "next/image";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Modal from '../components/Modal'; // Import Modal component

const Businesses = () => {
  const businesses = useBusinesses();
  const { saveBusiness, isLoading, error } = useManageBusiness();
  const [expandedRows, setExpandedRows] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedBusiness, setEditedBusiness] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

	const [newCategory, setNewCategory] = useState({ title: '', value: '' });
	const [editingCategoryId, setEditingCategoryId] = useState(null);
	const { categories, addCategory, editCategory, deleteCategory } = useCategories();
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

	
	const handleAddCategory = () => {
		addCategory(newCategory.title, newCategory.value.toLowerCase());
		setNewCategory({ title: '', value: '' });
	};
	
	const handleEditCategory = (id) => {
		const category = categories.find(cat => cat.id === id);
		setNewCategory({ title: category.title, value: category.value });
		setEditingCategoryId(id);
	};
	
	const handleUpdateCategory = () => {
		editCategory(editingCategoryId, newCategory.title, newCategory.value.toLowerCase());
		setNewCategory({ title: '', value: '' });
		setEditingCategoryId(null);
	};
	
	const handleDeleteCategory = (id) => {
		deleteCategory(id);
	};

  const renderPreferences = (preferences) => {
    return (
      <ul>
        {Object.entries(preferences).map(([key, value]) => (
          <li key={key}>{`${key}: ${value}`}</li>
        ))}
      </ul>
    );
  };

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

	const renderCategoryModalContent = () => (
		<div>
			<input
				type="text"
				placeholder="Category Title"
				className="border p-2 mb-2 w-full"
				value={newCategory.title}
				onChange={e => setNewCategory({ ...newCategory, title: e.target.value })}
			/>
			<input
				type="text"
				placeholder="Category Value (lowercase)"
				className="border p-2 mb-4 w-full"
				value={newCategory.value}
				onChange={e => setNewCategory({ ...newCategory, value: e.target.value })}
			/>
			<button
				onClick={editingCategoryId ? handleUpdateCategory : handleAddCategory}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				{editingCategoryId ? 'Update' : 'Add'} Category
			</button>
			{categories.map(category => (
				<div key={category.id} className="flex items-center justify-between mt-2">
					<span>{category.title}</span>
					<div>
						<button
							onClick={() => handleEditCategory(category.id)}
							className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
						>
							Edit
						</button>
						<button
							onClick={() => handleDeleteCategory(category.id)}
							className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
						>
							Delete
						</button>
					</div>
				</div>
			))}
		</div>
	);

  const openEditModal = (business) => {
    setEditedBusiness({ ...business });
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setEditedBusiness(null);
    setPhotoFile(null);
  };

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEditedBusiness((prev) => ({
			...prev,
			[name]: value,
		}));
	};

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const saveEditedBusiness = async () => {
    await saveBusiness(editedBusiness, photoFile);
    closeEditModal();
  };

  const renderEditModal = () => {
    if (!isModalOpen || !editedBusiness) return null;

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4 text-xs">
        <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
          <h2 className="text-xl font-bold mb-4">Edit Business</h2>
          <form className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Name</span>
              <input
                type="text"
                name="name"
                value={editedBusiness.name}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </label>
						<label className="block">
            <span className="text-gray-700">Category</span>
            <select
              name="category"
              value={editedBusiness.category}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.title}
                </option>
              ))}
            </select>
          </label>
            <label className="block">
              <span className="text-gray-700">Address</span>
              <input
                type="text"
                name="address"
                value={editedBusiness.address}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Rating</span>
              <input
                type="number"
                name="rating"
                value={editedBusiness.rating}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </label>
           
            {/* File Upload */}
            <div className="mb-4">
              <Image
                src={
                  editedBusiness?.photoUrl
                    ? editedBusiness.photoUrl
                    : "/no_image.jpg"
                }
                alt={`${editedBusiness.name}`}
                width={200}
                height={200}
                className="rounded"
              />
            </div>
            <label className="block">
              <span className="text-gray-700">Business Photo</span>
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-1 block w-full"
              />
            </label>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                type="button"
                onClick={saveEditedBusiness}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={isLoading}
              >
                Save
              </button>
              <button
                type="button"
                onClick={closeEditModal}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
			    <Modal isOpen={isCategoryModalOpen} onClose={() => setIsCategoryModalOpen(false)}>
      {renderCategoryModalContent()}
    </Modal>
    <button 
      onClick={() => setIsCategoryModalOpen(true)}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
    >
      Manage Categories
    </button>
      {renderEditModal()}
      <table className="w-full text-xs text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="py-3 px-6">
              Image
            </th>
            <th scope="col" className="py-3 px-6">
              Name
            </th>
						<th scope="col" className="py-3 px-6">
              Category
            </th>
            <th scope="col" className="py-3 px-6">
              Address
            </th>
            <th scope="col" className="py-3 px-6">
              Rating
            </th>
            <th scope="col" className="py-3 px-6">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {businesses.map((business) => (
            <React.Fragment key={business.id}>
              <tr className="bg-white border-b">
                <td className="p-1">
                  <Image
                    src={
                      business?.photoUrl ? business.photoUrl : "/no_image.jpg"
                    }
                    alt={business.name}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                </td>
                <td className="p-1">{business.name}</td>
                <td className="p-1">{business.category}</td>
                <td className="p-1">{business.address}</td>
                <td className="p-1">{business.rating}</td>
                <td className="p-1">
                  <button onClick={() => toggleRow(business.id)}>
                    {expandedRows[business.id] ? (
                      <IoIosArrowUp className="w-5 h-5" />
                    ) : (
                      <IoIosArrowDown className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={() => openEditModal(business)}
                    className="ml-2"
                  >
                    <MdEdit className="w-5 h-5" />
                  </button>
                </td>
              </tr>
              {expandedRows[business.id] && (
                <tr className="bg-gray-100 border-b">
                  <td className="p-1" colSpan="4">
                    {renderPreferences(business.preferences)}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {error && <p className="error">{error.message}</p>}
    </div>
  );
};

export default Businesses;

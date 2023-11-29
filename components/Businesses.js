import React, { useState } from "react";
import useBusinesses from "../hooks/useBusinesses";
import useManageBusiness from "../hooks/useManageBusiness"; // Import the custom hook
import { MdEdit } from "react-icons/md";
import Image from "next/image";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Businesses = () => {
  const businesses = useBusinesses();
  const { saveBusiness, isLoading, error } = useManageBusiness();
  const [expandedRows, setExpandedRows] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedBusiness, setEditedBusiness] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

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

  const handlePreferencesChange = (e) => {
    const { name, value } = e.target;
    setEditedBusiness((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: value,
      },
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
            {/* Preferences Editing */}
            <div>
              <h3 className="text-gray-700 text-lg mb-2">Preferences</h3>
              {Object.entries(editedBusiness.preferences).map(
                ([key, value]) => (
                  <label key={key} className="block mb-2">
                    <span className="text-gray-700 capitalize">{key}</span>
                    <input
                      type="number"
                      name={key}
                      value={value}
                      onChange={handlePreferencesChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                  </label>
                )
              )}
            </div>
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

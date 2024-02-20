import React, { useState, useEffect } from "react";
import { useGetUsersQuery, useDeleteUserMutation } from "../reducers/appslice";
import { useNavigate, useParams } from "react-router-dom";

const UserList = () => {
  const navigate = useNavigate();
  const { data: users, error, isLoading, refetch } = useGetUsersQuery();
  const { id } = useParams();
  const [deleteUser] = useDeleteUserMutation();
  const [deletedUserId, setDeletedUserId] = useState(null); // State to store the ID of the deleted user

  // UseEffect to refetch data when the ID parameter changes
  useEffect(() => {
    refetch();
  }, [id, refetch]);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setDeletedUserId(userId); // Set the ID of the deleted user
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditUser = (userId) => {
    navigate(`/${userId}`);
  };

  if (isLoading) return <div className="text-center text-3xl">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-3xl">
        Error in fetching data: {error.message}
      </div>
    );

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">User List</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <li key={user._id} className="bg-white shadow-md p-4 rounded-lg">
            {deletedUserId === user._id ? null : ( // Render the user only if not deleted
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">{user.name}</span>
                  <div>
                    <button
                      onClick={() => handleEditUser(user._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-gray-700">
                    {/* Display other user information here */}
                    <br />
                    {user.profilePicture && <img src={user.profilePicture} style={{ width: 480, height: 300 }} alt="PP" />}
                    Email: {user.email}
                    <br />
                    Address: {user.address}
                    <br />
                    Phone Number: {user.phoneNumber}
                    <br />
                    Date of Birth: {user.dateOfBirth}
                    <br />
                    Gender: {user.gender}
                    <br />
                    Nationality: {user.nationality}
                    <br />
                    Occupation: {user.occupation}
                    <br />
                    Interests: {user.interests}
                    <br />
                    Additional Notes: {user.additionalNotes}
                  </p>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

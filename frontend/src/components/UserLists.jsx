import React from 'react';
import { useGetUsersQuery, useDeleteUserMutation } from '../reducers/appslice';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const { data: users, error, isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const navigate = useNavigate();

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUser = (userId) => {
    // Redirect to the user form page with the user's ID as a URL parameter
    navigate(`/${userId}`);
  };

  if (isLoading) return <div className='text-center text-3xl'>Loading...</div>;
  if (error) return <div className='text-center text-3xl'>Error in fetching data: {error.message}</div>;

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">User List</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <li key={user.id} className="bg-white shadow-md p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">{user.name}</span>
              <div>
                <button
                  onClick={() => handleEditUser(user.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
            <div>
              <p className="text-gray-700">{/* Display other user information here */}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

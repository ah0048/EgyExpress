import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Fetch user profile data from API
  useEffect(() => {
    ftech('/api/profile') // Assuming '/api/profile' is your endpoint
      .then((res)=>(res.json()).then((data)=>setUserData(data))
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  if (!userData) {
    return <div>Loading...</div>; // Show a loading state while data is being fetched
  }

  // Navigate to orders page
  const handleOrdersClick = () => {
    navigate('/orders');
  };

  // Navigate to change password page
  const handleChangePasswordClick = () => {
    navigate('/change-password');
  };

  // Navigate to edit account page
  const handleEditAccountClick = () => {
    navigate('/edit-account');
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>

      {/* Display User Information */}
      <div className="profile-info">
        <img
          src={userData.img} // Assuming `profileImage` is the key for the user's image URL
          alt={`${userData.firstName} ${userData.lastName}`}
          className="profile-image"
        />
        <h2>{userData.firstName} {userData.lastName}</h2>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Address:</strong> {userData.address}</p>
      </div>

      {/* Orders Button */}
      <div className="profile-actions">
        <button className="btn" onClick={handleOrdersClick}>
          View Current Orders
        </button>

        {/* Change Password Button */}
        <button className="btn" onClick={handleChangePasswordClick}>
          Change Password
        </button>

        {/* Edit Account Information Button */}
        <button className="btn" onClick={handleEditAccountClick}>
          Edit Account Info
        </button>
      </div>
    </div>
  );
};

export default Profile;

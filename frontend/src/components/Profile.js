import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const useUserProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${user._id}`);
        setUserProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  return userProfile;
};

export default useUserProfile;

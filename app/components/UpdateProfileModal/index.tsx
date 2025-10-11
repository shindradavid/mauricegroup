import React, { useContext, useState } from 'react';
import AuthContext from '~/context/AuthContext';
import apiClient from '~/lib/apiClient';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const UpdateProfileModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { user, setUser } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState('');

  if (!isOpen || !user) return null;

  const handleSubmit = async () => {
    try {
      const response = await apiClient.post(`/customers/profile`, {
        phoneNumber,
      });

      setUser({ ...user, phoneNumber });
      onClose();
    } catch (err) {
      alert('Failed to create profile');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create Your Profile</h2>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
        />
        <button onClick={handleSubmit}>Update</button>
      </div>
    </div>
  );
};

export default UpdateProfileModal;

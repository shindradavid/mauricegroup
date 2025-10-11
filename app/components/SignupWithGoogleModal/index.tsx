import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';

import apiClient from '~/lib/apiClient';
import AuthContext from '~/context/AuthContext';
import { SESSION_ID_KEY } from '~/lib/constants';

import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const SignupWithGoogleModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { setUser } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setIsLoading(true);

    if (name && email && phoneNumber && password) {
      const signupPromise = apiClient
        .post('/auth/customers/signup', {
          name,
          email,
          phoneNumber,
          password,
        })
        .then((response) => {
          const { user, sessionId } = response.data.payload;
          localStorage.setItem(SESSION_ID_KEY, sessionId);
          setIsLoading(false);
          setUser(user);
          onClose();
        });

      toast.promise(signupPromise, {
        loading: 'Creating your account...',
        success: 'Signup successful!',
        error: 'Signup failed. Please try again.',
      });
    } else {
      toast.error('Please fill all fields.');
      setIsLoading(true);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className={styles.heading}>Create an account</h2>
        <div className="form">
          <div className="field">
            <label htmlFor="name" className="field__label">
              Name
            </label>

            <input
              type="text"
              name="name"
              id="name"
              className="field__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="receiverPhoneNumber" className="field__label">
              Phone number
            </label>

            <input
              type="text"
              name="receiverPhoneNumber"
              id="receiverPhoneNumber"
              placeholder="eg. 0743484155"
              className="field__input"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="receiverPhoneNumber" className="field__label">
              Email
            </label>

            <input
              type="email"
              name="email"
              id="email"
              className="field__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="receiverPhoneNumber" className="field__label">
              Password
            </label>

            <input
              type="password"
              name="password"
              id="password"
              className="field__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className={styles.submitButton} onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? '...signing up' : 'Signup'}
          </button>

          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupWithGoogleModal;

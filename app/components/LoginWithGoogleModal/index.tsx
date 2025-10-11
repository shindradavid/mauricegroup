import React, { useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';

import apiClient from '~/lib/apiClient';
import AuthContext from '~/context/AuthContext';
import { SESSION_ID_KEY } from '~/lib/constants';

import styles from './styles.module.scss';
import { useModals } from '~/context/ModalContext';
import { AxiosError } from 'axios';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const LoginWithGoogleModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { setUser } = useContext(AuthContext);

  const { closeGoogleModal, openSignupModal } = useModals();

  if (!isOpen) return null;

  const handleGoogleSuccess = async (credentialResponse: any) => {
    const loadingToastId = toast.loading('Logging you in...');

    try {
      const response = await apiClient.post('/auth/customers/google/login', {
        credential: credentialResponse.credential,
      });

      const { user, sessionId } = response.data.payload;

      localStorage.setItem(SESSION_ID_KEY, sessionId);
      setUser(user);
      onClose();
      toast.success('Login successful.', { id: loadingToastId });
    } catch (error) {
      console.error('Login failed', error);

      if (error instanceof AxiosError) {
        const message = error?.response?.data?.message || 'Login failed. Try again.';

        toast.error(message, { id: loadingToastId });
      } else {
        const message = 'Login failed. Try again.';

        toast.error(message, { id: loadingToastId });
      }
    }
  };

  const handleClick = () => {
    closeGoogleModal();
    openSignupModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className={styles.heading}>Login with Google</h2>
        <GoogleLogin
          auto_select={false}
          useOneTap={false}
          width="100%"
          onSuccess={handleGoogleSuccess}
          onError={() => toast.success('Login failed. Try again.')}
        />
        <p className={styles.signupText}>Don't have an account?</p>
        <button onClick={handleClick} className={styles.cancelButton}>
          Signup here
        </button>
      </div>
    </div>
  );
};

export default LoginWithGoogleModal;

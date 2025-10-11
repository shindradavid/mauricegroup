import React, { useState } from 'react';
import LoginWithGoogleModal from '../LoginWithGoogleModal';
import SignupWithGoogleModal from '../SignupWithGoogleModal';

const AuthModalsManager: React.FC = () => {
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowGoogleModal(true)}>Login with Google</button>

      <LoginWithGoogleModal isOpen={showGoogleModal} onClose={() => setShowGoogleModal(false)} />

      <SignupWithGoogleModal isOpen={showSignupModal} onClose={() => setShowSignupModal(false)} />
    </>
  );
};

export default AuthModalsManager;

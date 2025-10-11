// src/context/ModalContext.tsx
import React, { createContext, useContext, useState } from 'react';

type ModalContextType = {
  showGoogleModal: boolean;
  showSignupModal: boolean;
  openGoogleModal: () => void;
  closeGoogleModal: () => void;
  openSignupModal: () => void;
  closeSignupModal: () => void;
};

const ModalContext = createContext<ModalContextType>({
  showGoogleModal: false,
  showSignupModal: false,
  openGoogleModal: () => {},
  closeGoogleModal: () => {},
  openSignupModal: () => {},
  closeSignupModal: () => {},
});

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const openGoogleModal = () => setShowGoogleModal(true);
  const closeGoogleModal = () => setShowGoogleModal(false);
  const openSignupModal = () => setShowSignupModal(true);
  const closeSignupModal = () => setShowSignupModal(false);

  return (
    <ModalContext.Provider
      value={{
        showGoogleModal,
        showSignupModal,
        openGoogleModal,
        closeGoogleModal,
        openSignupModal,
        closeSignupModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModals = () => useContext(ModalContext);

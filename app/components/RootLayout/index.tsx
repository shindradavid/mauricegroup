import { useContext, useState } from 'react';
import { Link, NavLink, Outlet, useLoaderData } from 'react-router';
import { Share2 } from 'lucide-react';

import styles from './styles.module.scss';
import AuthContext from '~/context/AuthContext';
import LoginWithGoogleModal from '../LoginWithGoogleModal';
import UpdateProfileModal from '../UpdateProfileModal';
import { useModals } from '~/context/ModalContext';
import { useDrawer } from '~/context/DrawerContext';
import SignupWithGoogleModal from '../SignupWithGoogleModal';
import { useTenant } from '~/context/TenantContext';

export const RootLayout = () => {
  const tenant = useTenant();

  const { user } = useContext(AuthContext);

  const { toggleDrawer } = useDrawer();

  const { showGoogleModal, openGoogleModal, closeGoogleModal, showSignupModal, openSignupModal, closeSignupModal } =
    useModals();

  const handleShare = () => {
    if (window.location.protocol === 'https:') {
      if (typeof navigator.canShare === 'function') {
        const shareData = {
          url: window.location.href,
          title: document.title,
        };

        if (navigator.canShare(shareData)) {
          try {
            navigator.share(shareData);
          } catch (error) {
            console.error('Failed to share page:', error);
          }
        } else {
          console.log('Sharing not supported for this data.');
        }
      } else {
        console.log('Web Share API not supported.');
      }
    } else {
      console.log('Running on an insecure protocol');
    }
  };

  return (
    <>
      <div className={styles.rootLayout}>
        <div className={styles.topBar}>
          <header className={styles.header}>
            {user ? (
              <>
                <button className={styles.headerUserPhotoButton} onClick={toggleDrawer}>
                  <img src={user.photoUrl} width={48} height={48} className={styles.headerUserPhoto} loading="lazy" />
                </button>
              </>
            ) : (
              <button className={styles.headerLoginBtn} onClick={() => openGoogleModal()}>
                Login
              </button>
            )}

            <p className={styles.headerTitle}>{tenant.name}</p>

            <button className={styles.headerShareBtn} onClick={handleShare}>
              <Share2 />
            </button>
          </header>

          <nav className={styles.nav}>
            <NavLink to="/" className={styles.navLink}>
              Home
            </NavLink>

            <NavLink to="/cakes" className={styles.navLink}>
              Cakes
            </NavLink>

            <NavLink to="/events" className={styles.navLink}>
              Events
            </NavLink>

            <NavLink to="/baking-school" className={styles.navLink}>
              Baking school
            </NavLink>

            <NavLink to="/feedbacks" className={styles.navLink}>
              Feedbacks
            </NavLink>
          </nav>
        </div>

        <main className={styles.main}>
          <Outlet />
        </main>
      </div>

      <LoginWithGoogleModal isOpen={showGoogleModal} onClose={closeGoogleModal} />

      <SignupWithGoogleModal isOpen={showSignupModal} onClose={closeSignupModal} />
    </>
  );
};

export default RootLayout;

import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router';
import { X } from 'lucide-react';

import { useDrawer } from '~/context/DrawerContext';
import AuthContext from '~/context/AuthContext';
import styles from './styles.module.scss';

const NavigationDrawer: React.FC = () => {
  const { isDrawerOpen, closeDrawer } = useDrawer();
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!isDrawerOpen) return null;

  return (
    <div className={styles.overlay} onClick={closeDrawer}>
      <aside className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.closeIcon} onClick={closeDrawer}>
          <X size={24} />
        </div>

        <header className={styles.header}>
          {user ? (
            <div className={styles.userInfo}>
              <img src={user.photoUrl || '/default-avatar.png'} alt={user.name} className={styles.avatar} loading="lazy" />
              <div>
                <strong>{user.name}</strong>
                <p>{user.email}</p>
              </div>
            </div>
          ) : (
            <p className={styles.guestText}>Welcome, Guest</p>
          )}
        </header>

        <nav className={styles.nav}>
          <ul>
            <li>
              <Link to="/my-orders" onClick={closeDrawer} className={location.pathname === '/my-orders' ? styles.active : ''}>
                My orders
              </Link>
            </li>
            <li>
              <Link to="/" onClick={closeDrawer} className={location.pathname === '/' ? styles.active : ''}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/cakes" onClick={closeDrawer} className={location.pathname === '/cakes' ? styles.active : ''}>
                Cakes
              </Link>
            </li>
            <li>
              <Link to="/events" onClick={closeDrawer} className={location.pathname === '/events' ? styles.active : ''}>
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/baking-school"
                onClick={closeDrawer}
                className={location.pathname === '/baking-school' ? styles.active : ''}
              >
                Baking School
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default NavigationDrawer;

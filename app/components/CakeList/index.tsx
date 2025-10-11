import React from 'react';
import Masonry from 'react-masonry-css';
import styles from './styles.module.scss';
import { formatCurrency } from '~/lib/utils';
import type { Cake } from '~/lib/types';
import { Link, Navigate } from 'react-router';
import { useTenant } from '~/context/TenantContext';

interface CakeListProps {
  cakes: Cake[] | undefined;
  isLoading: boolean;
  error: any;
}

const CakeList: React.FC<CakeListProps> = ({ cakes, isLoading, error }) => {
  const tenant = useTenant();

  if (isLoading) {
    return (
      <div className={styles.centered}>
        <div className={styles.loader}></div>
        <p>Loading cakes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.centered}>
        <p className={styles.error}>Failed to load cakes.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (!cakes || cakes.length === 0) {
    return (
      <div className={styles.centered}>
        <p>No cakes found.</p>
      </div>
    );
  }

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
  };

  return (
    <div className={styles.cakeListContainer}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {cakes.map((cake) => (
          <Link to={`/cakes/${cake.id}`}>
            <div key={cake.id} className={styles.card}>
              <div className="cake-image-container aspect-ratio-2x3">
                <img src={cake.photoUrl} alt={cake.name} loading="lazy" />
                <div
                  className={styles.cakeImageLogo}
                  style={{ backgroundImage: `url(${tenant.logoUrl})` }}
                ></div>
              </div>
              <div className={styles.details}>
                <h3 className={styles.name}>{cake.name}</h3>
                <p className={styles.price}>{formatCurrency(cake.price)}</p>
              </div>
            </div>
          </Link>
        ))}
      </Masonry>
    </div>
  );
};

export default CakeList;

import Masonry from 'react-masonry-css';
import { Link } from 'react-router';

import styles from './GallerySection.module.scss';
import { useSchoolGallery } from '~/api/schoolApi';

const GallerySection = () => {
  const { data: gallery, isLoading, error } = useSchoolGallery();

  if (isLoading) {
    return (
      <div className={styles.centered}>
        <div className={styles.loader}></div>
        <p>Loading event photos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.centered}>
        <p className={styles.error}>Failed to load student's gallery.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (!gallery || gallery.length === 0) {
    return (
      <div className={styles.centered}>
        <p>No gallery found.</p>
      </div>
    );
  }

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
  };

  return (
    <section className={styles.cakeListContainer}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionHeaderTitle}>Student's gallery</h2>
      </header>

      <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
        {gallery.map((cake) => (
          <div key={cake.id} className={styles.card}>
            <img src={cake.photoUrl} alt={cake.caption ?? 'School gallery'} className={styles.image} loading="lazy" />
            <div className={styles.details}>
              <h3 className={styles.name}>{cake.caption}</h3>
            </div>
          </div>
        ))}
      </Masonry>
    </section>
  );
};

export default GallerySection;

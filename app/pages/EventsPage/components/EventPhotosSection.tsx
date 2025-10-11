import Masonry from 'react-masonry-css';
import { Link, Navigate } from 'react-router';

import styles from './EventPhotosSection.module.scss';
import { useEventPhotos } from '~/api/eventsApi';
import { useTenant } from '~/context/TenantContext';

const EventPhotosSection = () => {
  const tenant = useTenant();

  const { data: eventPhotos, isLoading, error } = useEventPhotos();

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
        <p className={styles.error}>Failed to load event photos.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (!eventPhotos || eventPhotos.length === 0) {
    return (
      <div className={styles.centered}>
        <p>No event photos found.</p>
      </div>
    );
  }

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
  };

  return (
    <section className={styles.eventPhotosListContainer}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionHeaderTitle}>Event photos</h2>
      </header>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {eventPhotos.map((eventPhoto) => (
          <Link to={`/events/photos/${eventPhoto.slug}`}>
            <div key={eventPhoto.id} className={styles.card}>
              <div className="cake-image-container aspect-ratio-4x5">
                <img src={eventPhoto.urls[0]} alt={eventPhoto.name} className={styles.image} loading="lazy" />
                <div className={styles.eventPhotoLogo} style={{ backgroundImage: tenant.logoUrl }}></div>
              </div>
              <div className={styles.details}>
                <h3 className={styles.name}>{eventPhoto.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </Masonry>
    </section>
  );
};

export default EventPhotosSection;

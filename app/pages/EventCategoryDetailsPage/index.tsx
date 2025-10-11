import Masonry from 'react-masonry-css';
import { Link, Navigate, useParams } from 'react-router';

import styles from './styles.module.scss';
import { useEventPhotos } from '~/api/eventsApi';
import { useTenant } from '~/context/TenantContext';

const EventCategoryDetailsPage = () => {
  const tenant = useTenant();

  const { slug } = useParams();

  const { data: eventPhotos, isLoading, error } = useEventPhotos({ categorySlug: slug });

  if (isLoading) {
    return (
      <div className={styles.centered}>
        <div className={styles.loader}></div>
        <p>Loading event category...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.centered}>
        <p className={styles.error}>Failed to load event category.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (!eventPhotos || eventPhotos.length === 0) {
    return (
      <div className={styles.centered}>
        <p>No event categories found.</p>
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
        <h2 className={styles.sectionHeaderTitle}>{slug?.replaceAll('-', ' ').toUpperCase()}</h2>
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

export default EventCategoryDetailsPage;

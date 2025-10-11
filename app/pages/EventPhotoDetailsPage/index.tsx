import Masonry from 'react-masonry-css';
import { Link, Navigate, useParams } from 'react-router';

import styles from './styles.module.scss';
import { useEventPhotoDetails } from '~/api/eventsApi';
import { useTenant } from '~/context/TenantContext';

const EventCategoryDetailsPage = () => {
  const tenant = useTenant();

  const { slug } = useParams();

  const { data: eventPhoto, isLoading, error } = useEventPhotoDetails({ photoSlug: slug });

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

  if (!eventPhoto) {
    return (
      <div className={styles.centered}>
        <p>No event categories found.</p>
      </div>
    );
  }

  return (
    <section className={styles.cakeListContainer}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionHeaderTitle}>{slug?.replaceAll('-', ' ').toUpperCase()}</h2>
      </header>

      <div>
        {eventPhoto.urls.map((url) => (
          <div key={url} className={styles.card}>
            <div className={styles.eventPhotoContainer}>
              <img
                src={url}
                alt={eventPhoto.name}
                className={styles.image}
                style={{ backgroundImage: tenant.logoUrl }}
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventCategoryDetailsPage;

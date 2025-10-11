import { Link } from 'react-router';

import { useEventCategories } from '~/api/eventsApi';
import styles from './EventCategoriesSection.module.scss';

export const EventCategoriesSection = () => {
  const { data: eventCategories } = useEventCategories();

  return (
    <section className={styles.section}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionHeaderTitle}>Event categories</h2>
      </header>

      <div className={styles.cakeCategoriesContainer}>
        {eventCategories.map((cakeCategory) => {
          return (
            <Link to={`/events/categories/${cakeCategory.slug}`} key={cakeCategory.id} className={styles.cakeCategoryLink}>
              <article className={styles.cakeCategoryCard}>
                <div className="aspect-ratio-1x1">
                  <img
                    src={cakeCategory.photoUrl}
                    alt={cakeCategory.name}
                    width="140"
                    className={styles.cakeCategoryImage}
                    loading="lazy"
                  />
                </div>

                <h3 className={styles.cakeCategoryName}>{cakeCategory.name}</h3>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default EventCategoriesSection;

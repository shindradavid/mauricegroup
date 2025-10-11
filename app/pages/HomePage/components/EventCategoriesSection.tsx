import { useEventCategories } from '~/api/eventsApi';
import styles from './EventCategoriesSection.module.scss';
import { Link } from 'react-router';

export const EventCategoriesSection = ({ title }: { title?: string }) => {
  const { data: eventCategories } = useEventCategories();

  return (
    <section className={styles.section}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionHeaderTitle}>Event decoration</h2>
        <p className={styles.sectionHeaderSubtitle}>
          We organize and decorate at weddings, introductions, kukyaala, baby showers, birthdays and also offer event cars for
          hire.
        </p>
      </header>

      <div className={styles.cakeCategoriesContainer}>
        {eventCategories.map((cakeCategory) => {
          return (
            <Link to={`/events/categories/${cakeCategory.slug}`} key={cakeCategory.id} className={styles.cakeCategoryLink}>
              <article className={styles.cakeCategoryCard}>
                <div className="cake-category__image">
                  <img
                    src={cakeCategory.photoUrl}
                    alt={cakeCategory.name}
                    width="140"
                    height="160"
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

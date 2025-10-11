import { useCakeCategories } from '~/api/cakesApi';

import styles from './CakeCategoriesSection.module.scss';
import CakeCategoryCard from './CakeCategoryCard';

export const CakeCategoriesSection = () => {
  const { data: cakeCategories } = useCakeCategories();

  return (
    <section className={styles.section}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionHeaderTitle}>Get a cake from us</h2>
        <p className={styles.sectionHeaderSubtitle}>
          Order a cake for your event and get it instantly, we deliver to most parts of the world.
        </p>
      </header>

      <div className={styles.cakeCategoriesContainer}>
        {cakeCategories?.map((cakeCategory) => {
          return <CakeCategoryCard key={cakeCategory.id} cakeCategory={cakeCategory} />;
        })}
      </div>
    </section>
  );
};

export default CakeCategoriesSection;

import { useCakeCategories } from '~/api/cakesApi';

import styles from './styles.module.scss';
import CakeCategoryCard from './CakeCategoryCard';
import CakeCategoryCardSkeleton from './CakeCategoryCardSkeleton';

export const CakeCategoriesSection = ({ title }: { title?: string }) => {
  const { data: cakeCategories, error, isLoading } = useCakeCategories();

  return (
    <section className={styles.section}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionHeaderTitle}>Cake Categories</h2>
        {title && <p className={styles.sectionHeaderSubtitle}>{title}</p>}
      </header>

      <div className={styles.cakeCategoriesContainer}>
        {isLoading && Array.from({ length: 12 }).map((_, index) => <CakeCategoryCardSkeleton key={index} />)}
        {cakeCategories &&
          cakeCategories?.map((cakeCategory) => <CakeCategoryCard key={cakeCategory.id} cakeCategory={cakeCategory} />)}
      </div>
    </section>
  );
};

export default CakeCategoriesSection;

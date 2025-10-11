import React from 'react';
import styles from './CakeCategoryCard.module.scss';
import skeletonStyles from './CakeCategoryCardSkeleton.module.scss';

const CakeCategoryCardSkeleton = () => {
  return (
    <div className={styles.cakeCategoryLink}>
      <div className={skeletonStyles.skeletonCard}>
        <div className={skeletonStyles.imageSkeleton}></div>
        <div className={skeletonStyles.textSkeleton}></div>
      </div>
    </div>
  );
};

export default CakeCategoryCardSkeleton;

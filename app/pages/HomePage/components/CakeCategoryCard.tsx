import { useCakes } from '~/api/cakesApi';

import styles from './CakeCategoryCard.module.scss';
import type { CakeCategory } from '~/lib/types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

interface CakeCategoryCardProps {
  cakeCategory: CakeCategory;
}

export const CakeCategoryCard: React.FC<CakeCategoryCardProps> = ({ cakeCategory }) => {
  const [cakeImages, setCakeImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: cakes } = useCakes({ categoryId: cakeCategory.id, limit: 3 });

  useEffect(() => {
    if (cakes && cakes.length > 0) {
      const imageUrls = cakes.filter((cake) => !!cake.photoUrl).map((cake) => cake.photoUrl as string);

      setCakeImages(imageUrls);
    }
  }, [cakes]);

  useEffect(() => {
    if (cakeImages.length === 0) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * cakeImages.length);
      setCurrentImageIndex(randomIndex);
    }, 10000);

    return () => clearInterval(interval);
  }, [cakeImages]);

  return (
    <Link to={`/cakes/categories/${cakeCategory.slug}`} key={cakeCategory.id} className={styles.cakeCategoryLink}>
      <article className={styles.cakeCategoryCard}>
        <div className="cake-category__image">
          <div className="aspect-ratio-1x1">
            <img
              src={cakeImages[currentImageIndex] || cakeCategory.photoUrl}
              alt={cakeCategory.name}
              width="140"
              height="160"
              className={styles.cakeCategoryImage}
              loading="lazy"
            />
          </div>
        </div>

        <h3 className={styles.cakeCategoryName}>{cakeCategory.name}</h3>
      </article>
    </Link>
  );
};

export default CakeCategoryCard;

import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useCakes } from '~/api/cakesApi';
import type { CakeCategory } from '~/lib/types';
import styles from './CakeCategoryCard.module.scss';

interface CakeCategoryCardProps {
  cakeCategory: CakeCategory;
}

export const CakeCategoryCard: React.FC<CakeCategoryCardProps> = ({ cakeCategory }) => {
  const [cakeImages, setCakeImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch cakes associated with this category using the mock useCakes hook
  const { data: cakes } = useCakes({ categoryId: cakeCategory.id, limit: 3 });

  // Effect to extract image URLs from fetched cakes
  useEffect(() => {
    if (cakes && cakes.length > 0) {
      const imageUrls = cakes.filter((cake) => !!cake.photoUrl).map((cake) => cake.photoUrl as string);
      setCakeImages(imageUrls);
      // Reset current image index when cakeImages change to avoid out-of-bounds
      setCurrentImageIndex(0);
    } else {
      // If no cake images, fall back to the category's photoUrl
      setCakeImages(cakeCategory.photoUrl ? [cakeCategory.photoUrl] : []);
    }
  }, [cakes, cakeCategory.photoUrl]);

  // Effect for image rotation
  useEffect(() => {
    // Only set up interval if there are multiple images to cycle through
    if (cakeImages.length <= 1) return;

    const interval = setInterval(() => {
      // Randomly select an image index
      const randomIndex = Math.floor(Math.random() * cakeImages.length);
      setCurrentImageIndex(randomIndex);
    }, 10000); // Change image every 10 seconds

    // Cleanup function for the interval
    return () => clearInterval(interval);
  }, [cakeImages]); // Re-run effect if cakeImages array changes

  // Determine the image to display
  const displayImageUrl =
    cakeImages[currentImageIndex] ||
    cakeCategory.photoUrl ||
    'https://placehold.co/300x400/e0e0e0/555555?text=Category+Image';

  return (
    // Link component to navigate to the category-specific cakes page
    <Link to={`/cakes/categories/${cakeCategory.slug}`} className={styles.cakeCategoryLink}>
      <article className={styles.cakeCategoryCard}>
        <div className={styles.imageWrapper}>
          {' '}
          {/* Using imageWrapper as defined in SCSS */}
          <img
            src={displayImageUrl}
            alt={cakeCategory.name}
            // The width and height are handled by CSS object-fit: cover and absolute positioning within the aspect ratio container
            // onError for fallback images
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/300x400/e0e0e0/555555?text=Image+Load+Error';
            }}
            className={styles.cakeCategoryImage} // Apply object-fit: cover and border-radius
            loading="lazy"
          />
        </div>
        <h3 className={styles.categoryName}>{cakeCategory.name}</h3> {/* Using categoryName as defined in SCSS */}
      </article>
    </Link>
  );
};

export default CakeCategoryCard;

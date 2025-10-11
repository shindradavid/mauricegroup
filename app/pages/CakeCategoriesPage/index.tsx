import { useCakeCategories } from '~/api/cakesApi';

import styles from './styles.module.scss';
import CakeCategoryCard from './components/CakeCategoryCard';
import { getTenantByHost } from '~/utils/tenantManager';
import type { Route } from './+types';

export async function loader({ request }: Route.LoaderArgs) {
  const host = new URL(request.url).hostname;
  const tenant = getTenantByHost(host);
  return { tenant };
}

export function meta({ loaderData }: Route.MetaArgs) {
  const { tenant } = loaderData;

  return [
    { title: `Categories | ${tenant.name}` },
    {
      name: 'description',
      content: tenant.slogan,
    },
  ];
}

const CakeCategoriesPage: React.FC = () => {
  // Use React Query to fetch cake categories
  const { data: categoriesResponse, isLoading, isError, error } = useCakeCategories();

  const cakeCategories = categoriesResponse || [];

  if (isLoading) {
    return <div className={styles.loadingMessage}>Loading cake categories...</div>;
  }

  if (isError) {
    return <div className={styles.errorMessage}>Error loading categories: {error?.message}</div>;
  }

  return (
    <main className={styles.main}>
      {/* Placeholder for SEO */}
      <title>Cake Categories</title>

      <section className={styles.cakeCategories}>
        <h1 className={styles.cakeCategories__heading}>Explore Our Delicious Cake Categories</h1>

        {cakeCategories.length > 0 ? (
          <div className={styles.cakeCategories__container}>
            {cakeCategories.map((category) => (
              <CakeCategoryCard cakeCategory={category} />
            ))}
          </div>
        ) : (
          <p className={styles.noCategoriesMessage}>No cake categories to display yet.</p>
        )}
      </section>
    </main>
  );
};

export default CakeCategoriesPage;

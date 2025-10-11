import { useQueryState } from 'nuqs';

import type { Route } from './+types';
import type { CakePriceFilter } from '~/lib/types';
import { useCakes } from '~/api/cakesApi';
import CakeCategoriesSection from '~/components/CakeCategoriesSection';
import CakeList from '~/components/CakeList';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { getTenantByHost } from '~/utils/tenantManager';

export async function loader({ request }: Route.LoaderArgs) {
  const host = new URL(request.url).hostname;
  const tenant = getTenantByHost(host);
  return { tenant };
}

export function meta({ loaderData }: Route.MetaArgs) {
  const { tenant } = loaderData;

  return [
    { title: `Cakes | ${tenant.name}` },
    {
      name: 'description',
      content: tenant.slogan,
    },
  ];
}

export const CakesPage = () => {
  const navigate = useNavigate();

  const filters: CakePriceFilter[] = [
    { name: 'All', value: 'all', color: '#7BEBFAFF' },
    { name: '40k', value: '40k', color: '#FFA2C1FF' },
    { name: '50k', value: '50000', color: '#FFA2C1FF' },
    { name: '60k', value: '60000', color: '#FFCD81FF' },
    { name: '70k', value: '70000', color: '#B4FBB8FF' },
    { name: '80k', value: '80000', color: '#B191E9FF' },
    { name: '90k', value: '90000', color: '#D583E3FF' },
    { name: '100k', value: '100000', color: '#FFF176' },
    { name: '110k', value: '110000', color: '#FFA876FF' },
    { name: '120k', value: '120000', color: '#FF76BFFF' },
    { name: '130k', value: '130000', color: '#FF8B76FF' },
    { name: '140k', value: '140000', color: '#76C1FFFF' },
    { name: '150k', value: '150000', color: '#76C1FFFF' },
    { name: '200k - 500k', value: '200k - 500k', color: '#76C1FFFF' },
    { name: '500k - 1m', value: '500k - 1m', color: '#76C1FFFF' },
    { name: 'Above 1m', value: 'Above 1m', color: '#76C1FFFF' },
  ];

  const [price, setPrice] = useQueryState('price', {
    defaultValue: 'all',
    history: 'push',
  });

  const selectedFilter = filters.find((f) => f.name === price) || filters[0];

  const {
    data: cakes,
    isLoading,
    error,
  } = useCakes({
    limit: 80,
    price: selectedFilter.value,
  });

  return (
    <div>
      <CakeCategoriesSection />
      <div className={styles.filterContainer}>
        {filters
          .filter((filter) => filter.name != '40k')
          .map((filter) => {
            const selected = filter.value === selectedFilter.value;

            return (
              <button
                key={filter.name}
                className={`${styles.filterButton} ${selected ? styles.selected : ''}`}
                style={{ backgroundColor: filter.color }}
                onClick={() => setPrice(filter.name)}
              >
                {filter.name}
              </button>
            );
          })}
      </div>

      <CakeList cakes={cakes} isLoading={isLoading} error={error} />

      <div className={styles.fabContainer}>
        <button
          className={styles.fabButton}
          onClick={() => {
            navigate('/cakes/custom-order');
          }}
        >
          <span className={styles.fabIcon}>+</span>
          <span className={styles.fabText}>Custom order</span>
        </button>
      </div>
    </div>
  );
};

export default CakesPage;

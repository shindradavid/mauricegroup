import { useParams } from 'react-router';
import styles from './styles.module.scss';

import { useQueryState } from 'nuqs';
import { useCakes } from '~/api/cakesApi';
import CakeList from '~/components/CakeList';

interface Filter {
  name: string;
  value: any;
  color: string;
}

const filters: Filter[] = [
  { name: 'All', value: 'all', color: '#7BEBFAFF' },
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

const CakeCategoryDetailsScreen = () => {
  const { slug } = useParams();

  const [price, setPrice] = useQueryState('price', {
    defaultValue: 'all',
    history: 'push',
  });

  const selectedFilter = filters.find((f) => f.name === price) || filters[0];

  const { data: cakes, isLoading, error } = useCakes({ slug, price: selectedFilter.value, limit: 80 });

  return (
    <section>
      <div className={styles.filterContainer}>
        {filters.map((item) => {
          const selected = item.name === selectedFilter.name;
          return (
            <button
              key={item.name}
              className={`${styles.filterButton} ${selected ? styles.selectedFilterButton : ''}`}
              style={{ backgroundColor: item.color }}
              onClick={() => setPrice(item.name)}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      <CakeList cakes={cakes} isLoading={isLoading} error={error} />
    </section>
  );
};

export default CakeCategoryDetailsScreen;

import React, { useContext } from 'react';

import styles from './styles.module.scss';
import { useCakeOrders } from '~/api/cakeOrdersApi';
import CakeOrderCard from './components/CakeOrderCard';
import CommissionStats from './components/CommissionStats';
import AuthContext from '~/context/AuthContext';
import type { Route } from './+types';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'My orders | Maurice Cake & Events' },
    {
      name: 'description',
      content: 'Your favorite cakes and events partner.',
    },
  ];
}

const MyOrdersPage: React.FC = () => {
  const { user } = useContext(AuthContext);

  const { data: cakeOrders, isLoading, error } = useCakeOrders();

  return (
    <div className={styles.myOrdersPage}>
      <h1>My Orders</h1>

      {isLoading && <p>Loading orders...</p>}

      {error && <p className={styles.error}>{error.message}</p>}

      {user && user.isMarketeer && <CommissionStats />}

      {cakeOrders.length === 0 && !isLoading && <p>No orders found.</p>}

      <div className={styles.orderList}>
        {cakeOrders.map((order) => (
          <CakeOrderCard order={order} />
        ))}
      </div>
    </div>
  );
};

export default MyOrdersPage;

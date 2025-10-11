import React from 'react';
import styles from './CommissionStats.module.scss';

import { formatCurrency } from '~/lib/utils';
import { useCommissionStats } from '~/api/cakeOrdersApi';

const CommissionStats: React.FC = () => {
  const { data, isLoading, error } = useCommissionStats();

  console.log(data);

  if (isLoading) {
    return (
      <div className={styles.statsCard}>
        <h2>💰 Commission Stats</h2>
        <div className={styles.loading}>Loading commission stats...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.statsCard}>
        <h2>💰 Commission Stats</h2>
        <div className={styles.error}>⚠️ {error.message}</div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className={styles.statsCard}>
      <h2>💰 Commission Stats</h2>
      <div className={styles.statItem}>
        <label>Total Earned:</label>
        <span>{formatCurrency(data.totalCommissionEarned)}</span>
      </div>
      <div className={styles.statItem}>
        <label>Pending Commission:</label>
        <span>{formatCurrency(data.totalPendingCommission)}</span>
      </div>
    </div>
  );
};

export default CommissionStats;

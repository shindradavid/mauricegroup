import React from 'react';
import { format } from 'date-fns';

import styles from './CakeOrderCard.module.scss';
import type { CakeOrder } from '~/lib/types';
import { CakeOrderDepositStatus, type ExternalCakeOrderStatus } from '~/lib/enums';
import { formatCurrency } from '~/lib/utils';
import { Link } from 'react-router';

interface Props {
  order: CakeOrder;
}

const getStatusColor = (status: ExternalCakeOrderStatus): string => {
  switch (status) {
    case 'pending':
      return '#BDBDBD';
    case 'baking':
      return '#F542B6';
    case 'finished baking':
      return '#42A5F5';
    case 'delivered':
      return '#565DA8';
    case 'completed':
      return '#388E3C';
    case 'deleted':
      return '#E53935';
    default:
      return '#BDBDBD';
  }
};

const CakeOrderCard: React.FC<Props> = ({ order }) => {
  const deliveryDate = format(new Date(order.deliveryDateTime), 'do LLL, yyyy');
  const deliveryTime = format(new Date(order.deliveryDateTime), 'p');
  const statusColor = getStatusColor(order.externalStatus);

  const confirmedDeposit = order.deposits
    .filter((d) => d.status === CakeOrderDepositStatus.CONFIRMED)
    .reduce((sum, d) => sum + d.amount, 0);

  return (
    <Link to={`/my-orders/${order.id}`}>
      <div className={styles.card}>
        <div className={styles.left}>
          <img
            src={order.photos?.[0] || 'https://media.keshosting.com/mymaurice/cake-order-photos/default-cake-pic.png'}
            alt="Cake preview"
            loading="lazy"
          />
          <div className={styles.statusBadge} style={{ backgroundColor: statusColor }}>
            {order.externalStatus.toUpperCase()}
          </div>
          <div className={styles.sourceTag}>{order.source === 'external app' ? 'Self Order' : 'Staff Order'}</div>
        </div>

        <div className={styles.right}>
          {/* <p>
          <strong>Marketer:</strong> {order.marketer.userAccount.name}
        </p> */}
          <p>
            <strong>Price:</strong> {formatCurrency(order.price)}
          </p>
          <p>
            <strong>Deposit:</strong> {formatCurrency(confirmedDeposit)}
          </p>
          <p>
            <strong>Delivery date:</strong> {deliveryDate}
          </p>
          <p>
            <strong>Delivery time:</strong> {deliveryTime}
          </p>
          <p>
            <strong>Writings:</strong> "{order.cakeWritings}"
          </p>
          <p>
            <strong>Description:</strong> {order.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CakeOrderCard;

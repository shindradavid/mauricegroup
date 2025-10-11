import { format } from 'date-fns';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';

import styles from './styles.module.scss';
import { useCakeOrderDetails, useRequestCakeOrderCommissionMutation } from '~/api/cakeOrdersApi';
import { CakeOrderDepositStatus, CakeOrderSource, ExternalCakeOrderStatus } from '~/lib/enums';
import { formatCurrency } from '~/lib/utils';
import AuthContext from '~/context/AuthContext';
import toast from 'react-hot-toast';

const CakeOrderDetailsPage: React.FC = () => {
  const { user } = useContext(AuthContext);

  const { id } = useParams<{ id: string }>();

  const { data: cakeOrder, isLoading, error } = useCakeOrderDetails(id!);

  const requestCommissionMutation = useRequestCakeOrderCommissionMutation({
    onError: (message) => {
      toast.error(message ?? 'Failed to request commission');
    },
    onSuccess: (message) => {
      toast.success(message ?? 'Commission requested');
    },
  });

  const handleRequestCommission = async () => {
    if (!cakeOrder) return;

    requestCommissionMutation.mutate({ cakeOrderId: cakeOrder.id });
  };

  if (error) return <p className={styles.error}>{error.message}</p>;

  if (isLoading) return <p>Loading...</p>;

  if (!cakeOrder) return <p>Cake order not found</p>;

  const confirmedDeposit = cakeOrder?.deposits
    .filter((d) => d.status === CakeOrderDepositStatus.CONFIRMED)
    .reduce((total, d) => total + d.amount, 0);

  const statusColors: Record<ExternalCakeOrderStatus, string> = {
    pending: '#BDBDBD',
    'sent to bakery': '#FFA726',
    baking: '#F542B6',
    'finished baking': '#42A5F5',
    delivered: '#565DA8',
    completed: '#388E3C',
    deleted: '#E53935',
  };

  const hasPendingOrApprovedRequest = cakeOrder.commissionRequests.some(
    (req) => req.status === 'pending' || req.status === 'approved',
  );

  return (
    <div className={styles.page}>
      <h1>Order Details</h1>
      <div className={styles.card}>
        <div className={styles.left}>
          <img src={cakeOrder?.photos[0] ?? '/default-cake.png'} alt="Cake preview" loading="lazy" />
          <div className={styles.statusBadge} style={{ backgroundColor: statusColors[cakeOrder?.externalStatus] }}>
            {cakeOrder?.externalStatus.toUpperCase()}
          </div>
          <div className={styles.sourceTag}>{cakeOrder?.source}</div>
        </div>
        <div className={styles.right}>
          <p>
            <strong>Price:</strong> {formatCurrency(cakeOrder?.price)}
          </p>
          <p>
            <strong>Deposit:</strong> {formatCurrency(confirmedDeposit)}
          </p>
          <p>
            <strong>Delivery Date:</strong> {format(new Date(cakeOrder?.deliveryDateTime), 'do MMM, yyyy')}
          </p>
          <p>
            <strong>Delivery Time:</strong> {format(new Date(cakeOrder?.deliveryDateTime), 'p')}
          </p>
          <p>
            <strong>Delivery Location:</strong> {cakeOrder?.deliveryLocation}
          </p>
          <p>
            <strong>Receiver:</strong> {cakeOrder?.receiverName} ({cakeOrder?.receiverPhoneNumber})
          </p>
          <p>
            <strong>Writings:</strong> "{cakeOrder?.cakeWritings}"
          </p>
          <p>
            <strong>Description:</strong> {cakeOrder?.description}
          </p>

          {cakeOrder.commissionRequests.length > 0 && (
            <div className={styles.commissionBox}>
              <h2>Commission Request</h2>
              {cakeOrder.commissionRequests.map((req) => (
                <div key={req.id} className={styles.commissionItem}>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span
                      className={`${styles.status} ${
                        req.status === 'approved'
                          ? styles.approved
                          : req.status === 'pending'
                          ? styles.pending
                          : styles.denied
                      }`}
                    >
                      {req.status.toUpperCase()}
                    </span>
                  </p>
                  <p>
                    <strong>Amount:</strong> {formatCurrency(req.amount)}
                  </p>
                  {req.status === 'denied' && req.rejectionReason && (
                    <p>
                      <strong>Reason:</strong> {req.rejectionReason}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {user &&
            user.isMarketeer &&
            cakeOrder.externalStatus === ExternalCakeOrderStatus.COMPLETED &&
            cakeOrder.source === CakeOrderSource.EXTERNAL_APP &&
            !hasPendingOrApprovedRequest && (
              <div className={styles.requestBox}>
                <button
                  className={styles.requestBtn}
                  onClick={handleRequestCommission}
                  disabled={requestCommissionMutation.isPending}
                >
                  {requestCommissionMutation.isPending ? 'Requesting...' : 'Request Commission'}
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default CakeOrderDetailsPage;

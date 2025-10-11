import type { Route } from './+types';

import { useFeedbacks } from '~/api/feedbacksApi';
import styles from './styles.module.scss';
import { getTenantByHost } from '~/utils/tenantManager';

export async function loader({ request }: Route.LoaderArgs) {
  const host = new URL(request.url).hostname;
  const tenant = getTenantByHost(host);
  return { tenant };
}

export function meta({ loaderData }: Route.MetaArgs) {
  const { tenant } = loaderData;

  return [
    { title: `Feedbacks | ${tenant.name}` },
    {
      name: 'description',
      content: tenant.slogan,
    },
  ];
}

const FeedbacksPage = () => {
  const { data: feedbacks, isLoading, error } = useFeedbacks();

  if (isLoading) {
    return (
      <div className={styles.centered}>
        <div className={styles.loader}></div>
        <p>Loading feedbacks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.centered}>
        <p className={styles.error}>Failed to load feedbacks.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (!feedbacks || feedbacks.length === 0) {
    return (
      <div className={styles.centered}>
        <p>No feedbacks found.</p>
      </div>
    );
  }

  return (
    <div className={styles.feedbacksListContainer}>
      <h1 className={styles.title}>Feedbacks</h1>

      {feedbacks.map((feedback) => (
        <div key={feedback.id} className={styles.card}>
          <img src={feedback.photoUrl} alt={feedback.caption} className={styles.image} loading="lazy" />
          <div className={styles.details}>
            <h3 className={styles.name}>{feedback.caption}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbacksPage;

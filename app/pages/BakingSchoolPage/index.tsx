import type { Route } from './+types';

import styles from './styles.module.scss';
import GallerySection from './components/GallerySection';
import { getTenantByHost } from '~/utils/tenantManager';

export async function loader({ request }: Route.LoaderArgs) {
  const host = new URL(request.url).hostname;
  const tenant = getTenantByHost(host);
  return { tenant };
}

export function meta({ loaderData }: Route.MetaArgs) {
  const { tenant } = loaderData;

  return [
    { title: `Baking school | ${tenant.name}` },
    {
      name: 'description',
      content: tenant.slogan,
    },
  ];
}

export default function BakingSchoolPage() {
  return (
    <main>
      <section className={styles.section}>
        <header className={styles.sectionHeader}>
          <h1 className={styles.sectionHeaderTitle}>Maurice School of Baking And Decoration</h1>
          <p className={styles.sectionHeaderSubtitle}>
            We offer hands-on training, expert instructors, and industry-standard curriculum ensure that
            students gain practical experience and confidence to start their own businesses or pursue successful
            careers.
          </p>
        </header>

        <h3>Our courses</h3>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <b>Baking Level 1 & 2 </b>, Fees - 1,000,000 (1 semester, 3 months) and 1,300,000 for boarding
          </li>
          <li className={styles.listItem}>
            <b>Advanced Baking and Cake Decoration Level 3 (Master class)</b> , Fees - 1,000,000 (1 semester, 3
            months) and 1,300,000 for boarding.
          </li>
          <li className={styles.listItem}>
            <b>Events Decoration Level 1</b>, Fees - 1,000,000 (1 semester, 3 months) and 1,300,000 for boarding
          </li>
          <li className={styles.listItem}>
            <b>Events Decoration & Management Level 2 & 3 </b>, Fees - 1,000,000 (1 semester, 3 months) and
            1,300,000 for boarding.
          </li>
        </ul>

        <img src="/images/baking-school-flyer.png" alt="Baking School Flyer" loading="lazy" />
      </section>

      <GallerySection />
    </main>
  );
}

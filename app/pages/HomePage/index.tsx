import CakeCategoriesSection from '~/components/CakeCategoriesSection';
import type { Route } from './+types/index';

import BakingSchoolSection from './components/BakingSchoolSection';
import EventCategoriesSection from './components/EventCategoriesSection';
import { getTenantByHost } from '~/utils/tenantManager';

export async function loader({ request }: Route.LoaderArgs) {
  const host = new URL(request.url).hostname;
  const tenant = getTenantByHost(host);
  return { tenant };
}

export function meta({ loaderData }: Route.MetaArgs) {
  const { tenant } = loaderData;

  return [
    { title: `Home | ${tenant.name}` },
    {
      name: 'description',
      content: tenant.slogan,
    },
  ];
}

export const HomePage = () => {
  return (
    <div>
      <CakeCategoriesSection title=" Order a cake for your event and get it instantly, we deliver to most parts of the world." />
      <EventCategoriesSection />
      <BakingSchoolSection />
    </div>
  );
};

export default HomePage;

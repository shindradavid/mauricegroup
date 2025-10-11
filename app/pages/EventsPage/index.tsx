import { getTenantByHost } from '~/utils/tenantManager';
import type { Route } from './+types';

import EventCategoriesSection from './components/EventCategoriesSection';
import EventPhotosSection from './components/EventPhotosSection';

export async function loader({ request }: Route.LoaderArgs) {
  const host = new URL(request.url).hostname;
  const tenant = getTenantByHost(host);
  return { tenant };
}

export function meta({ loaderData }: Route.MetaArgs) {
  const { tenant } = loaderData;

  return [
    { title: `Events | ${tenant.name}` },
    {
      name: 'description',
      content: tenant.slogan,
    },
  ];
}

export const EventsPage = () => {
  return (
    <div>
      <EventCategoriesSection />
      <EventPhotosSection />
    </div>
  );
};

export default EventsPage;

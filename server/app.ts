import 'react-router';
import { createRequestHandler } from '@react-router/express';
import express from 'express';

import { getTenantByHostHeader, type Tenant } from '~/utils/tenantManager';

declare module 'react-router' {
  interface AppLoadContext {
    tenant: Tenant;
  }
}

export const app = express();

app.use(
  createRequestHandler({
    build: () => import('virtual:react-router/server-build'),
    getLoadContext(req) {
      const host = req.headers['x-forwarded-host'] || req.headers['host'];
      const tenant = getTenantByHostHeader(host as string);

      return { tenant };
    },
  }),
);

import * as React from 'react';

export type Tenant = {
  id: string;
  name: string;
  logoUrl: string;
  cssVars: Record<string, string>;
};

type TenantContextValue = {
  tenant: Tenant;
};

const TenantContext = React.createContext<TenantContextValue | undefined>(undefined);

export const TenantProvider = ({ tenant, children }: { tenant: Tenant; children: React.ReactNode }) => {
  return <TenantContext.Provider value={{ tenant }}>{children}</TenantContext.Provider>;
};

export function useTenant() {
  const context = React.useContext(TenantContext);

  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }

  return context.tenant;
}

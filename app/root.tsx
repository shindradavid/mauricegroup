import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, type LoaderFunctionArgs } from 'react-router';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
import { useLoaderData } from 'react-router';
import { useEffect, useMemo } from 'react';

import './styles/index.scss';

import type { Route } from './+types/root';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalProvider } from './context/ModalContext';
import AuthProvider from './providers/AuthProvider';
import { DrawerProvider } from './context/DrawerContext';
import NavigationDrawer from './components/NavigationDrawer';
import { TenantProvider } from './context/TenantContext';

export async function loader({ context }: LoaderFunctionArgs) {
  return { tenant: context.tenant };
}

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { tenant } = useLoaderData() as { tenant: { id: string; cssVars: Record<string, string>; name: string } };

  const cssVars = useMemo(() => {
    return Object.entries(tenant.cssVars)
      .map(([key, val]) => `${key}:${val}`)
      .join(';');
  }, [tenant]);

  useEffect(() => {
    Object.entries(tenant.cssVars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [tenant]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <style>{`:root { ${cssVars} }`}</style>
      </head>
      <body>
        <TenantProvider tenant={tenant}>{children}</TenantProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <GoogleOAuthProvider clientId="782625251446-mhtpeo0feekqbrc021c6svrqit55pmq2.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <AuthProvider>
            <DrawerProvider>
              <NuqsAdapter>
                <Toaster />
                <NavigationDrawer />
                <Outlet />
              </NuqsAdapter>
            </DrawerProvider>
          </AuthProvider>
        </ModalProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

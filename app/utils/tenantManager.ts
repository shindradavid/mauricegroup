// server/tenantManager.ts
export type Tenant = {
  id: string;
  name: string;
  logoUrl: string;
  slogan: string;
  cssVars: Record<string, string>;
};

const tenants: Record<string, Tenant> = {
  'expresscakesandevents.keshosting.com': {
    id: 'expresscakesandevents',
    name: 'Express Cakes & Events',
    logoUrl: '/images/expresscakesandevents-logo.png',
    slogan: 'No order is an emergency',
    cssVars: {
      '--clr-accent-1': '#ed117f',
      '--clr-accent-2': '#ed117f',
      // status colors
      '--clr-error': '#ba1c1c',
      '--clr-success': '#157f3c',
      '--clr-info': '#2463eb',
      '--clr-warning': '#c88a04',
      // BACKGROUND COLORS
      // primary
      '--clr-bg-primary': '#ffffff',
      '--clr-txt-primary-on-bg-primary': '#000000',
      '--clr-txt-secondary-on-bg-primary': '#292929',
      '--clr-border-primary-on-bg-bg-primary': '#000000',
      '--clr-border-secondary-on-bg-bg-primary': '#292929',
      // secondary
      '--clr-bg-secondary': '#fdedf0',
      '--clr-txt-primary-on-bg-secondary': '#000000',
      '--clr-txt-secondary-on-bg-secondary': '#292929',
      '--clr-border-primary-on-bg-bg-secondary': '#000000',
      '--clr-border-secondary-on-bg-bg-secondary': '#292929',
      // tertiary
      '--clr-bg-tertiary': '#232323',
      // accent-1
      '--clr-bg-accent-1': '#ed117f',
      '--clr-txt-primary-on-bg-accent-1': '#fafafa',
      '--clr-txt-secondary-on-bg-accent-1': '#dbdbdb',
      '--clr-border-primary-on-bg-bg-accent-1': '#dbdbdb',
      '--clr-border-secondary-on-bg-accent-1': '#b8b8b8',
      // accent-2
      '--clr-bg-accent-2': '#ed117f',
      '--clr-txt-primary-on-bg-accent-2': '#f5f5f5',
      '--clr-txt-secondary-on-bg-accent-2': '#dbdbdb',
      '--clr-border-primary-on-bg-bg-accent-2': '#e6e6e6',
      '--clr-border-secondary-on-bg-accent-2': '#cccccc',
    },
  },
  'royalbakeryandevents.keshosting.com': {
    id: 'royalbakeryandevents',
    name: 'Royal Bakery & Events',
    logoUrl: '/images/royalbakeryandevents-logo.png',
    slogan: 'Taste the royal',
    cssVars: {
      '--clr-accent-1': '#bd5305',
      '--clr-accent-2': '#bd5305',
      // status colors
      '--clr-error': '#ba1c1c',
      '--clr-success': '#157f3c',
      '--clr-info': '#2463eb',
      '--clr-warning': '#c88a04',
      // BACKGROUND COLORS
      // primary
      '--clr-bg-primary': '#ffffff',
      '--clr-txt-primary-on-bg-primary': '#000000',
      '--clr-txt-secondary-on-bg-primary': '#292929',
      '--clr-border-primary-on-bg-bg-primary': '#000000',
      '--clr-border-secondary-on-bg-bg-primary': '#292929',
      // secondary
      '--clr-bg-secondary': '#fdedf0',
      '--clr-txt-primary-on-bg-secondary': '#000000',
      '--clr-txt-secondary-on-bg-secondary': '#292929',
      '--clr-border-primary-on-bg-bg-secondary': '#000000',
      '--clr-border-secondary-on-bg-bg-secondary': '#292929',
      // tertiary
      '--clr-bg-tertiary': '#232323',
      // accent-1
      '--clr-bg-accent-1': '#bd5305',
      '--clr-txt-primary-on-bg-accent-1': '#fafafa',
      '--clr-txt-secondary-on-bg-accent-1': '#dbdbdb',
      '--clr-border-primary-on-bg-bg-accent-1': '#dbdbdb',
      '--clr-border-secondary-on-bg-accent-1': '#b8b8b8',
      // accent-2
      '--clr-bg-accent-2': '#bd5305',
      '--clr-txt-primary-on-bg-accent-2': '#f5f5f5',
      '--clr-txt-secondary-on-bg-accent-2': '#dbdbdb',
      '--clr-border-primary-on-bg-bg-accent-2': '#e6e6e6',
      '--clr-border-secondary-on-bg-accent-2': '#cccccc',
    },
  },
  'skycakesandevents.keshosting.com': {
    id: 'skycakesandevents',
    name: 'Sky Cakes & Events',
    logoUrl: '/images/skycakesandevents-logo.png',
    slogan: 'A bliss in every taste',
    cssVars: {
      '--clr-accent-1': '#ff3aea',
      '--clr-accent-2': '#ff3aea',
      // status colors
      '--clr-error': '#ba1c1c',
      '--clr-success': '#157f3c',
      '--clr-info': '#2463eb',
      '--clr-warning': '#c88a04',
      // BACKGROUND COLORS
      // primary
      '--clr-bg-primary': '#ffffff',
      '--clr-txt-primary-on-bg-primary': '#000000',
      '--clr-txt-secondary-on-bg-primary': '#292929',
      '--clr-border-primary-on-bg-bg-primary': '#000000',
      '--clr-border-secondary-on-bg-bg-primary': '#292929',
      // secondary
      '--clr-bg-secondary': '#fdedf0',
      '--clr-txt-primary-on-bg-secondary': '#000000',
      '--clr-txt-secondary-on-bg-secondary': '#292929',
      '--clr-border-primary-on-bg-bg-secondary': '#000000',
      '--clr-border-secondary-on-bg-bg-secondary': '#292929',
      // tertiary
      '--clr-bg-tertiary': '#232323',
      // accent-1
      '--clr-bg-accent-1': '#ff3aea',
      '--clr-txt-primary-on-bg-accent-1': '#fafafa',
      '--clr-txt-secondary-on-bg-accent-1': '#dbdbdb',
      '--clr-border-primary-on-bg-bg-accent-1': '#dbdbdb',
      '--clr-border-secondary-on-bg-accent-1': '#b8b8b8',
      // accent-2
      '--clr-bg-accent-2': '#ff3aea',
      '--clr-txt-primary-on-bg-accent-2': '#f5f5f5',
      '--clr-txt-secondary-on-bg-accent-2': '#dbdbdb',
      '--clr-border-primary-on-bg-bg-accent-2': '#e6e6e6',
      '--clr-border-secondary-on-bg-accent-2': '#cccccc',
    },
  },
  'cakevibesandevents.keshosting.com': {
    id: 'cakevibesandevents',
    name: 'Cake Vibes & Events',
    logoUrl: '/images/cakevibesandevents-logo.png',
    slogan: 'Service beyond expectation',
    cssVars: {
      '--clr-accent-1': '#dc9548',
      '--clr-accent-2': '#dc9548',
      // status colors
      '--clr-error': '#ba1c1c',
      '--clr-success': '#157f3c',
      '--clr-info': '#2463eb',
      '--clr-warning': '#c88a04',
      // BACKGROUND COLORS
      // primary
      '--clr-bg-primary': '#ffffff',
      '--clr-txt-primary-on-bg-primary': '#000000',
      '--clr-txt-secondary-on-bg-primary': '#292929',
      '--clr-border-primary-on-bg-bg-primary': '#000000',
      '--clr-border-secondary-on-bg-bg-primary': '#292929',
      // secondary
      '--clr-bg-secondary': '#fdedf0',
      '--clr-txt-primary-on-bg-secondary': '#000000',
      '--clr-txt-secondary-on-bg-secondary': '#292929',
      '--clr-border-primary-on-bg-bg-secondary': '#000000',
      '--clr-border-secondary-on-bg-bg-secondary': '#292929',
      // tertiary
      '--clr-bg-tertiary': '#232323',
      // accent-1
      '--clr-bg-accent-1': '#dc9548',
      '--clr-txt-primary-on-bg-accent-1': '#fafafa',
      '--clr-txt-secondary-on-bg-accent-1': '#dbdbdb',
      '--clr-border-primary-on-bg-bg-accent-1': '#dbdbdb',
      '--clr-border-secondary-on-bg-accent-1': '#b8b8b8',
      // accent-2
      '--clr-bg-accent-2': '#dc9548',
      '--clr-txt-primary-on-bg-accent-2': '#f5f5f5',
      '--clr-txt-secondary-on-bg-accent-2': '#dbdbdb',
      '--clr-border-primary-on-bg-bg-accent-2': '#e6e6e6',
      '--clr-border-secondary-on-bg-accent-2': '#cccccc',
    },
  },
  'victorycakesandevents.keshosting.com': {
    id: 'victorycakesandevents',
    name: 'Victory Cakes & Events',
    logoUrl: '/images/victorycakesandevents-logo.png',
    slogan: 'Heavenly exceptional taste',
    cssVars: {
      '--clr-accent-1': '#ef018d',
      '--clr-accent-2': '#ef018d',
      // status colors
      '--clr-error': '#ba1c1c',
      '--clr-success': '#157f3c',
      '--clr-info': '#2463eb',
      '--clr-warning': '#c88a04',
      // BACKGROUND COLORS
      // primary
      '--clr-bg-primary': '#ffffff',
      '--clr-txt-primary-on-bg-primary': '#000000',
      '--clr-txt-secondary-on-bg-primary': '#292929',
      '--clr-border-primary-on-bg-bg-primary': '#000000',
      '--clr-border-secondary-on-bg-bg-primary': '#292929',
      // secondary
      '--clr-bg-secondary': '#fdedf0',
      '--clr-txt-primary-on-bg-secondary': '#000000',
      '--clr-txt-secondary-on-bg-secondary': '#292929',
      '--clr-border-primary-on-bg-bg-secondary': '#000000',
      '--clr-border-secondary-on-bg-bg-secondary': '#292929',
      // tertiary
      '--clr-bg-tertiary': '#232323',
      // accent-1
      '--clr-bg-accent-1': '#ef018d',
      '--clr-txt-primary-on-bg-accent-1': '#fafafa',
      '--clr-txt-secondary-on-bg-accent-1': '#dbdbdb',
      '--clr-border-primary-on-bg-bg-accent-1': '#dbdbdb',
      '--clr-border-secondary-on-bg-accent-1': '#b8b8b8',
      // accent-2
      '--clr-bg-accent-2': '#ef018d',
      '--clr-txt-primary-on-bg-accent-2': '#f5f5f5',
      '--clr-txt-secondary-on-bg-accent-2': '#dbdbdb',
      '--clr-border-primary-on-bg-bg-accent-2': '#e6e6e6',
      '--clr-border-secondary-on-bg-accent-2': '#cccccc',
    },
  },
  'grandcakesandevents.keshosting.com': {
    id: 'grandcakesandevents',
    name: 'Grand Cakes & Events',
    logoUrl: '/images/grandcakesandevents-logo.png',
    slogan: 'Make your day historical & memorable with our cakes and decoration',
    cssVars: {
      '--clr-accent-1': '#bd8228',
      '--clr-accent-2': '#bd8228',
      // status colors
      '--clr-error': '#ba1c1c',
      '--clr-success': '#157f3c',
      '--clr-info': '#2463eb',
      '--clr-warning': '#c88a04',
      // BACKGROUND COLORS
      // primary
      '--clr-bg-primary': '#ffffff',
      '--clr-txt-primary-on-bg-primary': '#000000',
      '--clr-txt-secondary-on-bg-primary': '#292929',
      '--clr-border-primary-on-bg-bg-primary': '#000000',
      '--clr-border-secondary-on-bg-bg-primary': '#292929',
      // secondary
      '--clr-bg-secondary': '#fdedf0',
      '--clr-txt-primary-on-bg-secondary': '#000000',
      '--clr-txt-secondary-on-bg-secondary': '#292929',
      '--clr-border-primary-on-bg-bg-secondary': '#000000',
      '--clr-border-secondary-on-bg-bg-secondary': '#292929',
      // tertiary
      '--clr-bg-tertiary': '#232323',
      // accent-1
      '--clr-bg-accent-1': '#bd8228',
      '--clr-txt-primary-on-bg-accent-1': '#fafafa',
      '--clr-txt-secondary-on-bg-accent-1': '#dbdbdb',
      '--clr-border-primary-on-bg-bg-accent-1': '#dbdbdb',
      '--clr-border-secondary-on-bg-accent-1': '#b8b8b8',
      // accent-2
      '--clr-bg-accent-2': '#bd8228',
      '--clr-txt-primary-on-bg-accent-2': '#f5f5f5',
      '--clr-txt-secondary-on-bg-accent-2': '#dbdbdb',
      '--clr-border-primary-on-bg-bg-accent-2': '#e6e6e6',
      '--clr-border-secondary-on-bg-accent-2': '#cccccc',
    },
  },
  'deluxecakeplanetandevents.keshosting.com': {
    id: 'deluxecakeplanetandevents',
    name: 'Deluxe Cake Planet & Events',
    logoUrl: '/images/deluxecakeplanetandevents-logo.png',
    slogan: 'Making your celebrations sweeter',
    cssVars: {
      '--clr-accent-1': '#e2000a',
      '--clr-accent-2': '#e2000a',
      // status colors
      '--clr-error': '#ba1c1c',
      '--clr-success': '#157f3c',
      '--clr-info': '#2463eb',
      '--clr-warning': '#c88a04',
      // BACKGROUND COLORS
      // primary
      '--clr-bg-primary': '#ffffff',
      '--clr-txt-primary-on-bg-primary': '#000000',
      '--clr-txt-secondary-on-bg-primary': '#292929',
      '--clr-border-primary-on-bg-bg-primary': '#000000',
      '--clr-border-secondary-on-bg-bg-primary': '#292929',
      // secondary
      '--clr-bg-secondary': '#fdedf0',
      '--clr-txt-primary-on-bg-secondary': '#000000',
      '--clr-txt-secondary-on-bg-secondary': '#292929',
      '--clr-border-primary-on-bg-bg-secondary': '#000000',
      '--clr-border-secondary-on-bg-bg-secondary': '#292929',
      // tertiary
      '--clr-bg-tertiary': '#232323',
      // accent-1
      '--clr-bg-accent-1': '#e2000a',
      '--clr-txt-primary-on-bg-accent-1': '#fafafa',
      '--clr-txt-secondary-on-bg-accent-1': '#dbdbdb',
      '--clr-border-primary-on-bg-bg-accent-1': '#dbdbdb',
      '--clr-border-secondary-on-bg-accent-1': '#b8b8b8',
      // accent-2
      '--clr-bg-accent-2': '#e2000a',
      '--clr-txt-primary-on-bg-accent-2': '#f5f5f5',
      '--clr-txt-secondary-on-bg-accent-2': '#dbdbdb',
      '--clr-border-primary-on-bg-bg-accent-2': '#e6e6e6',
      '--clr-border-secondary-on-bg-accent-2': '#cccccc',
    },
  },
  'ultimatecakepalaceandevents.keshosting.com': {
    id: 'ultimatecakepalaceandevents',
    name: 'Ultimate Cake Palace & Events',
    logoUrl: '/images/ultimatecakepalaceandevents-logo.png',
    slogan: 'Taste the greatness',
    cssVars: {
      '--clr-accent-1': '#f3172f',
      '--clr-accent-2': '#f3172f',
      // status colors
      '--clr-error': '#ba1c1c',
      '--clr-success': '#157f3c',
      '--clr-info': '#2463eb',
      '--clr-warning': '#c88a04',
      // BACKGROUND COLORS
      // primary
      '--clr-bg-primary': '#ffffff',
      '--clr-txt-primary-on-bg-primary': '#000000',
      '--clr-txt-secondary-on-bg-primary': '#292929',
      '--clr-border-primary-on-bg-bg-primary': '#000000',
      '--clr-border-secondary-on-bg-bg-primary': '#292929',
      // secondary
      '--clr-bg-secondary': '#fdedf0',
      '--clr-txt-primary-on-bg-secondary': '#000000',
      '--clr-txt-secondary-on-bg-secondary': '#292929',
      '--clr-border-primary-on-bg-bg-secondary': '#000000',
      '--clr-border-secondary-on-bg-bg-secondary': '#292929',
      // tertiary
      '--clr-bg-tertiary': '#232323',
      // accent-1
      '--clr-bg-accent-1': '#f3172f',
      '--clr-txt-primary-on-bg-accent-1': '#fafafa',
      '--clr-txt-secondary-on-bg-accent-1': '#dbdbdb',
      '--clr-border-primary-on-bg-bg-accent-1': '#dbdbdb',
      '--clr-border-secondary-on-bg-accent-1': '#b8b8b8',
      // accent-2
      '--clr-bg-accent-2': '#f3172f',
      '--clr-txt-primary-on-bg-accent-2': '#f5f5f5',
      '--clr-txt-secondary-on-bg-accent-2': '#dbdbdb',
      '--clr-border-primary-on-bg-bg-accent-2': '#e6e6e6',
      '--clr-border-secondary-on-bg-accent-2': '#cccccc',
    },
  },
  'cakebashandevents.keshosting.com': {
    id: 'cakebashandevents',
    name: 'Cake Bash & Events',
    logoUrl: '/images/cakebashandevents-logo.png',
    slogan: 'Taste the greatness',
    cssVars: {
      '--clr-accent-1': '#fd0708',
      '--clr-accent-2': '#fd0708',
      // status colors
      '--clr-error': '#ba1c1c',
      '--clr-success': '#157f3c',
      '--clr-info': '#2463eb',
      '--clr-warning': '#c88a04',
      // BACKGROUND COLORS
      // primary
      '--clr-bg-primary': '#ffffff',
      '--clr-txt-primary-on-bg-primary': '#000000',
      '--clr-txt-secondary-on-bg-primary': '#292929',
      '--clr-border-primary-on-bg-bg-primary': '#000000',
      '--clr-border-secondary-on-bg-bg-primary': '#292929',
      // secondary
      '--clr-bg-secondary': '#fdedf0',
      '--clr-txt-primary-on-bg-secondary': '#000000',
      '--clr-txt-secondary-on-bg-secondary': '#292929',
      '--clr-border-primary-on-bg-bg-secondary': '#000000',
      '--clr-border-secondary-on-bg-bg-secondary': '#292929',
      // tertiary
      '--clr-bg-tertiary': '#232323',
      // accent-1
      '--clr-bg-accent-1': '#f3172f',
      '--clr-txt-primary-on-bg-accent-1': '#fafafa',
      '--clr-txt-secondary-on-bg-accent-1': '#dbdbdb',
      '--clr-border-primary-on-bg-bg-accent-1': '#dbdbdb',
      '--clr-border-secondary-on-bg-accent-1': '#b8b8b8',
      // accent-2
      '--clr-bg-accent-2': '#f3172f',
      '--clr-txt-primary-on-bg-accent-2': '#f5f5f5',
      '--clr-txt-secondary-on-bg-accent-2': '#dbdbdb',
      '--clr-border-primary-on-bg-bg-accent-2': '#e6e6e6',
      '--clr-border-secondary-on-bg-accent-2': '#cccccc',
    },
  },
  'cakelandandevents.keshosting.com': {
    id: 'cakelandandevents',
    name: 'Cake Land & Events',
    logoUrl: '/images/cakelandandevents-logo.png',
    slogan: 'Taste the greatness',
    cssVars: {
      '--clr-accent-1': '#303123',
      '--clr-accent-2': '#303123',
      // status colors
      '--clr-error': '#ba1c1c',
      '--clr-success': '#157f3c',
      '--clr-info': '#2463eb',
      '--clr-warning': '#c88a04',
      // BACKGROUND COLORS
      // primary
      '--clr-bg-primary': '#ffffff',
      '--clr-txt-primary-on-bg-primary': '#000000',
      '--clr-txt-secondary-on-bg-primary': '#292929',
      '--clr-border-primary-on-bg-bg-primary': '#000000',
      '--clr-border-secondary-on-bg-bg-primary': '#292929',
      // secondary
      '--clr-bg-secondary': '#fdedf0',
      '--clr-txt-primary-on-bg-secondary': '#000000',
      '--clr-txt-secondary-on-bg-secondary': '#292929',
      '--clr-border-primary-on-bg-bg-secondary': '#000000',
      '--clr-border-secondary-on-bg-bg-secondary': '#292929',
      // tertiary
      '--clr-bg-tertiary': '#232323',
      // accent-1
      '--clr-bg-accent-1': '#f3172f',
      '--clr-txt-primary-on-bg-accent-1': '#fafafa',
      '--clr-txt-secondary-on-bg-accent-1': '#dbdbdb',
      '--clr-border-primary-on-bg-bg-accent-1': '#dbdbdb',
      '--clr-border-secondary-on-bg-accent-1': '#b8b8b8',
      // accent-2
      '--clr-bg-accent-2': '#f3172f',
      '--clr-txt-primary-on-bg-accent-2': '#f5f5f5',
      '--clr-txt-secondary-on-bg-accent-2': '#dbdbdb',
      '--clr-border-primary-on-bg-bg-accent-2': '#e6e6e6',
      '--clr-border-secondary-on-bg-accent-2': '#cccccc',
    },
  },
  'sunvillecakecityandevents.keshosting.com': {
    id: 'sunvillecakecityandevents',
    name: 'Sunville Cake City & Events',
    logoUrl: '/images/sunvillecakecityandevents-logo.png',
    slogan: 'Taste the greatness',
    cssVars: {
      '--clr-accent-1': '#025afc',
      '--clr-accent-2': '#025afc',
      // status colors
      '--clr-error': '#ba1c1c',
      '--clr-success': '#157f3c',
      '--clr-info': '#2463eb',
      '--clr-warning': '#c88a04',
      // BACKGROUND COLORS
      // primary
      '--clr-bg-primary': '#ffffff',
      '--clr-txt-primary-on-bg-primary': '#000000',
      '--clr-txt-secondary-on-bg-primary': '#292929',
      '--clr-border-primary-on-bg-bg-primary': '#000000',
      '--clr-border-secondary-on-bg-bg-primary': '#292929',
      // secondary
      '--clr-bg-secondary': '#fdedf0',
      '--clr-txt-primary-on-bg-secondary': '#000000',
      '--clr-txt-secondary-on-bg-secondary': '#292929',
      '--clr-border-primary-on-bg-bg-secondary': '#000000',
      '--clr-border-secondary-on-bg-bg-secondary': '#292929',
      // tertiary
      '--clr-bg-tertiary': '#232323',
      // accent-1
      '--clr-bg-accent-1': '#f3172f',
      '--clr-txt-primary-on-bg-accent-1': '#fafafa',
      '--clr-txt-secondary-on-bg-accent-1': '#dbdbdb',
      '--clr-border-primary-on-bg-bg-accent-1': '#dbdbdb',
      '--clr-border-secondary-on-bg-accent-1': '#b8b8b8',
      // accent-2
      '--clr-bg-accent-2': '#f3172f',
      '--clr-txt-primary-on-bg-accent-2': '#f5f5f5',
      '--clr-txt-secondary-on-bg-accent-2': '#dbdbdb',
      '--clr-border-primary-on-bg-bg-accent-2': '#e6e6e6',
      '--clr-border-secondary-on-bg-accent-2': '#cccccc',
    },
  },
  'yummiliciousandevents.keshosting.com': {
    id: 'yummiliciousandevents',
    name: 'Yummilicious & Events',
    logoUrl: '/images/yummiliciousandevents-logo.png',
    slogan: 'Taste the greatness',
    cssVars: {
      '--clr-accent-1': '#f6020b',
      '--clr-accent-2': '#f6020b',
      // status colors
      '--clr-error': '#ba1c1c',
      '--clr-success': '#157f3c',
      '--clr-info': '#2463eb',
      '--clr-warning': '#c88a04',
      // BACKGROUND COLORS
      // primary
      '--clr-bg-primary': '#ffffff',
      '--clr-txt-primary-on-bg-primary': '#000000',
      '--clr-txt-secondary-on-bg-primary': '#292929',
      '--clr-border-primary-on-bg-bg-primary': '#000000',
      '--clr-border-secondary-on-bg-bg-primary': '#292929',
      // secondary
      '--clr-bg-secondary': '#fdedf0',
      '--clr-txt-primary-on-bg-secondary': '#000000',
      '--clr-txt-secondary-on-bg-secondary': '#292929',
      '--clr-border-primary-on-bg-bg-secondary': '#000000',
      '--clr-border-secondary-on-bg-bg-secondary': '#292929',
      // tertiary
      '--clr-bg-tertiary': '#232323',
      // accent-1
      '--clr-bg-accent-1': '#f3172f',
      '--clr-txt-primary-on-bg-accent-1': '#fafafa',
      '--clr-txt-secondary-on-bg-accent-1': '#dbdbdb',
      '--clr-border-primary-on-bg-bg-accent-1': '#dbdbdb',
      '--clr-border-secondary-on-bg-accent-1': '#b8b8b8',
      // accent-2
      '--clr-bg-accent-2': '#f3172f',
      '--clr-txt-primary-on-bg-accent-2': '#f5f5f5',
      '--clr-txt-secondary-on-bg-accent-2': '#dbdbdb',
      '--clr-border-primary-on-bg-bg-accent-2': '#e6e6e6',
      '--clr-border-secondary-on-bg-accent-2': '#cccccc',
    },
  },
  localhost: {
    id: 'localhost',
    name: 'Local Dev Tenant',
    logoUrl: '/images/expresscakesandevents-logo.png',
    slogan: 'No order is an emergency',
    cssVars: {
      '--clr-accent-1': '#df1ce5',
      '--clr-accent-2': '#df1ce5',
      // status colors
      '--clr-error': '#ba1c1c',
      '--clr-success': '#157f3c',
      '--clr-info': '#2463eb',
      '--clr-warning': '#c88a04',
      // BACKGROUND COLORS
      // primary
      '--clr-bg-primary': '#ffffff',
      '--clr-txt-primary-on-bg-primary': '#000000',
      '--clr-txt-secondary-on-bg-primary': '#292929',
      '--clr-border-primary-on-bg-bg-primary': '#000000',
      '--clr-border-secondary-on-bg-bg-primary': '#292929',
      // secondary
      '--clr-bg-secondary': '#fdedf0',
      '--clr-txt-primary-on-bg-secondary': '#000000',
      '--clr-txt-secondary-on-bg-secondary': '#292929',
      '--clr-border-primary-on-bg-bg-secondary': '#000000',
      '--clr-border-secondary-on-bg-bg-secondary': '#292929',
      // tertiary
      '--clr-bg-tertiary': '#232323',
      // accent-1
      '--clr-bg-accent-1': '#df1ce5',
      '--clr-txt-primary-on-bg-accent-1': '#fafafa',
      '--clr-txt-secondary-on-bg-accent-1': '#dbdbdb',
      '--clr-border-primary-on-bg-bg-accent-1': '#dbdbdb',
      '--clr-border-secondary-on-bg-accent-1': '#b8b8b8',
      // accent-2
      '--clr-bg-accent-2': '#df1ce5',
      '--clr-txt-primary-on-bg-accent-2': '#f5f5f5',
      '--clr-txt-secondary-on-bg-accent-2': '#dbdbdb',
      '--clr-border-primary-on-bg-bg-accent-2': '#e6e6e6',
      '--clr-border-secondary-on-bg-accent-2': '#cccccc',
    },
  },
};

export function getTenantByHostHeader(hostHeader?: string): Tenant {
  if (!hostHeader) return tenants['localhost'];

  const host = hostHeader.split(':')[0].toLowerCase();

  return tenants[host] || tenants['localhost'];
}

export function getTenantByHost(host?: string): Tenant {
  if (!host && typeof window !== 'undefined') {
    host = window.location.hostname;
  }

  const cleanHost = (host || '').split(':')[0].toLowerCase();

  return tenants[cleanHost] || tenants['localhost'];
}

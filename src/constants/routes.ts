export const ROUTES = {
  home: "/",

  b2c: {
    book: (salonId: string) => `/book/${salonId}` as const,
    myBookings: "/my-bookings",
    profile: "/profile",
  },

  b2b: {
    dashboard: "/dashboard",
    schedule: "/schedule",
    clients: "/clients",
    earnings: "/earnings",
  },

  api: {
    auth: "/api/auth",
    bookings: "/api/bookings",
    availability: "/api/availability",
    realtime: "/api/realtime",
    botB2c: "/api/bot-b2c",
    botB2b: "/api/bot-b2b",
  },
} as const;

export const PUBLIC_PATHS = [
  ROUTES.home,
  ROUTES.api.auth,
  ROUTES.api.botB2c,
  ROUTES.api.botB2b,
] as const;

export const B2B_PATHS = [
  ROUTES.b2b.dashboard,
  ROUTES.b2b.schedule,
  ROUTES.b2b.clients,
  ROUTES.b2b.earnings,
] as const;

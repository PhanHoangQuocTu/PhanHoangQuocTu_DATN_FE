export const ROUTE = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  PROFILE: '/profile',
  CART: '/cart',
  BOOKS: '/books',
  ADMIN_LOGIN: '/admin/login',
  DASHBOARD: '/admin/dashboard',
  USER_MANAGEMENT: '/admin/user-management',
  BOOK_MANAGEMENT: '/admin/book-management',
  ORDER_MANAGEMENT: '/admin/order-management',
  PUBLIHSER_MANAGEMENT: '/admin/publisher-management',
  CATEGORY_MANAGEMENT: '/admin/category-management',
  AUTHOR_MANAGEMENT: '/admin/author-management',
  MY_ORDER: '/my-order',
} as const;

export type ROUTE_KEY = keyof typeof ROUTE;

export const MAPPING_ROUTE_TITLE = {} as unknown as Record<ROUTE_KEY, string>;

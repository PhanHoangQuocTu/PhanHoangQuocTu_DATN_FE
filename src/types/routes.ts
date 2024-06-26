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
  CHECKOUT: '/checkout',
  MONTHLY_REPORTS: '/monthly-reports',
  VNPAY_RETURN: 'vnpay-return',
  POST_MANAGEMENT: '/admin/post-management',
  POST: '/post',
  ADMIN_MANAGEMENT: '/admin/admin-management',
} as const;

export type ROUTE_KEY = keyof typeof ROUTE;

export const MAPPING_ROUTE_TITLE = {} as unknown as Record<ROUTE_KEY, string>;

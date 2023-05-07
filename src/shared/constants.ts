export const APPLICATION_JSON = 'application/json';
export const TOTAL_COUNT_HEADER_NAME = 'x-total-count';
export const NEXT_PAGE_HEADER_NAME = 'x-next-page';
export const PAGE_HEADER_NAME = 'x-page';
export const PAGES_COUNT_HEADER_NAME = 'x-pages-count';
export const PER_PAGE_HEADER_NAME = 'x-per-page';
export const CURRENT_TIME = 'x-current-time';
export const ACCESS_TOKEN_HEADER_NAME = 'access-token';
export const enum AUTH_HEADERS {
  ACCESS_TOKEN = 'access-token',
  USER_IDENTIFIER = 'sub',
  NAMESPACE = 'namespace',
  ENTERPRISE = 'enterprise',
}

export enum DbModel {
  Users = 'Users',
  Emails = 'Emails',
  Shop = 'Shop',
}

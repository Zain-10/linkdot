/**
 * TODO: Refactor url to become dyanmic
 * use https://www.npmjs.com/package/typescript-string-operations
 */

const LocalRoutes = {
  auth: {
    connect: "/auth",
    selectCategory: "/auth/select-category",
    setUserName: "/auth/username",
    setEmail: "/auth/email",
  },
  authSelectCategory: "/auth/select-category",
  authSetUserName: "/auth/username",
  authSetEmail: "/auth/email",
  dashboard: "/",
  insights: "/",
  issueToUser: "/badge/issue",
  badgeInsights: "/insights/badge",
  badge: {
    create: "/badge/create",
    preview: "/badge/preview",
    issue: "/badge/issue",
  },
};

export { LocalRoutes };

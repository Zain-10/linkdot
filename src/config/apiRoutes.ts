const BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_URI;
const v1 = `${BASE_URL}/v1/`;

const apiRoutes = {
  connectWallet: `${v1}auth/register/wallet`,
  userType: `${v1}auth/register/type`,
  setUsername: `${v1}auth/register/username`,
  saveEmail: `${v1}auth/register/email`,
  getToken: `${v1}auth/token`,
  refreshToken: `${v1}auth/refresh/token`,

  // user routes
  getUser: `${v1}user/get`,
  // badge routes
  createBadge: `${v1}badge/create`,
  getBadge: `${v1}badge/show`,
  issueBadge: `${v1}badge/issue`,
  showAllBadges: `${v1}badge/show/all`,
  badgeDetail: `${v1}badge`, // TODO: use dynamic variables
  // claim routes
  claimBadge: `${v1}claim/badge`,
  claimBadgeContractData: `${v1}claim/badge_details`,
};

export { apiRoutes };

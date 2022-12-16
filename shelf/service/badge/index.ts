import { apiRoutes } from "@/config/apiRoutes";
import type { BadgeType } from "@/constants/badge";
import { axiosWrapper } from "@/helpers/axios-wrapper";

const AvailableTypes = {
  "Issued Badge": "issued",
  "Claimed Badge": "claimed",
};

export enum UploadMode {
  EMAIL = "Email",
  CSV = "CSV",
}

export type IssueBadgePayload = {
  emails: string[];
  uploadMode: UploadMode;
  badge_id: string;
};
async function getBadges(badgeType: BadgeType) {
  const url = `${apiRoutes.showAllBadges}?badge_type=${AvailableTypes[badgeType]}`;
  return axiosWrapper.get({ url });
}

async function getBadgeDetail(_id: string) {
  const url = `${apiRoutes.getBadge}?badge_id=${_id}`;
  return axiosWrapper.get({ url });
}

async function issueBadge(payload: IssueBadgePayload) {
  const url = `${apiRoutes.issueBadge}`;
  return axiosWrapper.post({ url, payload });
}

async function getBadgeDetailByEncryptedId(payload: { badge: string }) {
  const url = `${apiRoutes.badgeDetailByEncryptedId}`;
  return axiosWrapper.post({ url, payload });
}

export const badgeService = {
  getBadges,
  getBadgeDetail,
  issueBadge,
  getBadgeDetailByEncryptedId,
};

import { Action } from "@/constants";

export const Loading = {
  type: Action.SetLoading,
  payload: true,
};

export const NotLoading = {
  type: Action.SetLoading,
  payload: false,
};

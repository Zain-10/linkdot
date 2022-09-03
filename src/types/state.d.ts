import type { User } from "./user";

export type GlobalStateType = {
  loading: boolean;
  user: User | null;
  error: string;
};

export type GlobalActionType =
  | {
      type: Action.SetUser;
      payload: User;
    }
  | {
      type: Action.SetLoading;
      payload: boolean;
    };

export type GlobalContextType = {
  state: GlobalStateType;
  dispatch: React.Dispatch<GlobalActionType>;
};

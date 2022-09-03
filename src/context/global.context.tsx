import { createContext, useContext } from "react";

import type { GlobalContextType, GlobalStateType } from "@/types/state";

export const initialState: GlobalStateType = {
  loading: false,
  user: null,
  error: "",
};

export const GlobalContext = createContext<GlobalContextType>({
  state: initialState,
  dispatch: () => undefined,
});

export const useGlobalState = (): GlobalStateType => {
  const { state } = useContext(GlobalContext);
  return { ...state };
};

export const useUserState = (): User => {
  const {
    state: { user },
  } = useContext(GlobalContext);
  return user;
};

export const useGlobalDispatch = () => {
  const { dispatch } = useContext(GlobalContext);
  return dispatch;
};

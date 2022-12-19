import { Action } from "@/constants";
import type { GlobalActionType, GlobalStateType } from "@/types/state";

const globalContextReducer = (
  state: GlobalStateType,
  action: GlobalActionType
): GlobalStateType => {
  switch (action.type) {
    case Action.SetUser: {
      return { ...state, user: { ...state.user, ...action.payload } };
    }
    case Action.SetLoading: {
      return { ...state, loading: action.payload };
    }
    default:
      console.log("default");

      return state;
  }
};

export default globalContextReducer;

import type { ReactNode } from "react";
import { useReducer } from "react";

import { GlobalContext, initialState } from "../global.context";
import globalContextReducer from "../reducers/global.reducer";

type ProviderProps = {
  children: ReactNode;
};

const GlobalProvider = ({ children }: ProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(globalContextReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

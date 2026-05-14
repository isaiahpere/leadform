import { createContext, useContext } from "react";

export const ProfileStateContext = createContext(null);
export const ProfileDispatchContext = createContext(null);

export const useProfileState = () => {
  const context = useContext(ProfileStateContext);
  if (context === null) {
    throw new Error("Must be inside ProfileContextProvider");
  }
  return context;
};

export const useProfileDispatch = () => {
  const context = useContext(ProfileDispatchContext);
  if (context === null) {
    throw new Error("Must be inside ProfileContextProvider");
  }
  return context;
};

export const useProfile = () => {
  return {
    ...useProfileState(),
    dispatch: useProfileDispatch(),
  };
};

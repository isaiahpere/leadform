import { useMemo, useReducer } from "react";
import { ProfileStateContext, ProfileDispatchContext } from "./profileContext";

const initialState = {
  data: null,
  errors: null,
  isLoading: false,
};

const profileReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START": {
      return { data: null, isLoading: true, errors: null };
    }
    case "FETCH_SUCCESS": {
      if (!action.payload) return state;
      return { data: action.payload, isLoading: false, errors: null };
    }
    case "FETCH_FAILED": {
      if (!action.payload) return state;
      return { data: null, isLoading: false, errors: action.payload };
    }
    default:
      return state;
  }
};

export const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const stateValue = useMemo(() => state, [state]);
  const dispatchValue = useMemo(() => dispatch, [dispatch]);

  console.log(stateValue);

  return (
    <ProfileStateContext.Provider value={stateValue}>
      <ProfileDispatchContext.Provider value={dispatchValue}>
        {children}
      </ProfileDispatchContext.Provider>
    </ProfileStateContext.Provider>
  );
};

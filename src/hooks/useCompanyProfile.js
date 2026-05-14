import { useProfileDispatch } from "../context/profileContext";
import { fetchCompanyProfile } from "../utils/fetchCompanyProfile";

export const useCompanyProfile = () => {
  const dispatch = useProfileDispatch();

  const fetchProfile = async (fields, signal) => {
    dispatch({ type: "FETCH_START" });

    try {
      const results = await fetchCompanyProfile(fields, signal);
      dispatch({ type: "FETCH_SUCCESS", payload: results });
    } catch (err) {
      if (err.name !== "AbortError") {
        dispatch({ type: "FETCH_FAILED", payload: err });
      }
    }
  };

  return { fetchProfile };
};

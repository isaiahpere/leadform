import { useReducer } from "react";

const initialState = {
  fields: {
    companyName: "",
    industry: "",
    country: "",
    email: "",
  },
  errors: {},
  touched: {},
  isSubmitting: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD": {
      if (!action.field || !(action.field in state.fields)) {
        return state;
      }
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.field]: action.value,
        },
      };
    }
    case "SET_ERRORS": {
      if (!action.payload || typeof action.payload !== "object") return state;
      return {
        ...state,
        errors: action.payload,
      };
    }
    case "SET_IS_SUBMITTING": {
      if (typeof action.payload !== "boolean") return state;
      return {
        ...state,
        isSubmitting: action.payload,
      };
    }
    case "SET_TOUCHED": {
      if (!action.field || !(action.field in state.fields)) {
        return state;
      }
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.field]: true,
        },
      };
    }
    case "RESET": {
      return initialState;
    }
    default:
      return state;
  }
};

export const useLeadForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const updateField = (field, value) => {
    dispatch({ type: "UPDATE_FIELD", field, value });
  };

  const setErrors = (errors) => {
    dispatch({ type: "SET_ERRORS", payload: errors });
  };

  const setSubmitting = (bool) => {
    dispatch({ type: "SET_IS_SUBMITTING", payload: bool });
  };

  const setTouched = (field) => {
    dispatch({ type: "SET_TOUCHED", field });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    fields: state.fields,
    errors: state.errors,
    touched: state.touched,
    isSubmitting: state.isSubmitting,
    updateField,
    setErrors,
    setSubmitting,
    setTouched,
    reset,
  };
};

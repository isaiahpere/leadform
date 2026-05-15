import { useEffect, useId, useRef } from "react";

import { useLeadForm } from "../hooks/useLeadForm";
import { validateLeadForm } from "../utils/validationLeadForm";
import { useCompanyProfile } from "../hooks/useCompanyProfile";
import { useNavigate } from "react-router-dom";
import { useProfileState } from "../context/profileContext";

export const LeadFormFields = () => {
  const navigate = useNavigate();
  const {
    fields,
    isSubmitting,
    errors,
    touched,
    updateField,
    setErrors,
    setTouched,
    setSubmitting,
    reset,
  } = useLeadForm();

  const { errors: contextErrors } = useProfileState();

  const companyNameId = useId();
  const industryId = useId();
  const countryId = useId();
  const emailId = useId();

  const controllerRef = useRef(null);

  const { fetchProfile } = useCompanyProfile();

  const handleBlur = (field) => {
    setTouched(field);
    const validatedErrors = validateLeadForm(fields);
    setErrors(validatedErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page refresh

    // validation
    const validatedErrors = validateLeadForm(fields);
    if (Object.keys(validatedErrors).length > 0) {
      setErrors(validatedErrors);
      return;
    }

    // fetch API
    try {
      setSubmitting(true);
      controllerRef.current = new AbortController();
      await fetchProfile(fields, controllerRef.current?.signal);
      // shoudl check for errors before navgiation and reset
      navigate("/results");
      reset();
    } catch (err) {
      console.error("Error Form Submit", err);
    } finally {
      setSubmitting(false);
    }
  };

  // clean up controller
  useEffect(() => {
    return () => controllerRef.current?.abort();
  }, []);

  return (
    <>
      <form
        className="flex flex-col gap-6 w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor={companyNameId}>Company Name</label>
          <input
            id={companyNameId}
            type="text"
            onBlur={() => handleBlur("companyName")}
            value={fields.companyName}
            onChange={(e) => updateField("companyName", e.target.value)}
            className="border-2 border-zinc-400 rounded-md px-3 py-2"
          />
          {errors.companyName && touched.companyName && (
            <p className="text-red-500 text-sm">{errors.companyName}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={industryId}>Industry</label>
          <input
            id={industryId}
            type="text"
            value={fields.industry}
            onBlur={() => handleBlur("industry")}
            onChange={(e) => updateField("industry", e.target.value)}
            className="border-2 border-zinc-400 rounded-md px-3 py-2"
          />
          {errors.industry && touched.industry && (
            <p className="text-red-500 text-sm">{errors.industry}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={countryId}>Country</label>
          <input
            id={countryId}
            type="text"
            onBlur={() => handleBlur("country")}
            value={fields.country}
            onChange={(e) => updateField("country", e.target.value)}
            className="border-2 border-zinc-400 rounded-md px-3 py-2"
          />
          {errors.country && touched.country && (
            <p className="text-red-500 text-sm">{errors.country}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={emailId}>Email</label>
          <input
            id={emailId}
            type="email"
            value={fields.email}
            onBlur={() => handleBlur("email")}
            onChange={(e) => updateField("email", e.target.value)}
            className="border-2 border-zinc-400 rounded-md px-3 py-2"
          />
          {errors.email && touched.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <button
          type="submit"
          className="mt-4 bg-black text-white px-6 py-3 rounded-md disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
      </form>
      {contextErrors && (
        <p className="text-red-500 mt-5">
          Somethign went wrong. Please try again!
        </p>
      )}
    </>
  );
};

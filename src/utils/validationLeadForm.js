export const validateLeadForm = (fields) => {
  const errors = {};

  if (!fields.companyName.trim()) {
    errors.companyName = "Company name is required";
  }
  if (!fields.industry.trim()) {
    errors.industry = "Industry is required";
  }
  if (!fields.country.trim()) {
    errors.country = "Country is required";
  }
  if (!fields.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Enter a valid email address";
  }

  return errors;
};

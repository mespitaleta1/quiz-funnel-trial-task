
// Basic validations
export function validateName(name) {
  return name.trim().length >= 2;
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone) {
  return /^\+?[1-9]\d{7,14}$/.test(
    phone.replace(/[\s()-]/g, "")
  );
}


// Validate ONE field
export function validateField(field, value) {
  value = value.trim();

  switch (field) {
    case "name":
      if (!value) {
        return "Name is required.";
      }

      if (!validateName(value)) {
        return "Name must contain at least 2 characters.";
      }

      return "";

    case "email":
      if (!value) {
        return "Email is required.";
      }

      if (!validateEmail(value)) {
        return "Please enter a valid email address.";
      }

      return "";

    case "phone":
      if (!value) {
        return "Phone number is required.";
      }

      if (!validatePhone(value)) {
        return "Please enter a valid phone number.";
      }
      return "";

    default:
      return "";
  }

}


// Validate entire form
export function validateContact(contact) {
  const errors = {};

  ["name", "email", "phone"].forEach((field) => {
    const error = validateField(field, contact[field]);

    if (error) {
      errors[field] = error;
    }
  });

  return errors;
}
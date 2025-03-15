

// src/auth/shared/authUtils.ts
export const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  export const validatePassword = (password: string) => {
    if (!password) {
      return "Password is required"; 
    } else if (password.length < 6) {
      return "Password must be at least 6 characters";
    } else if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    } else if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
      return "Password must contain at least one special character";
    }
      return ""; // No errors
  };
  
  
  export const formatCurrency = (value: string): string => {
    return parseFloat(value).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
};


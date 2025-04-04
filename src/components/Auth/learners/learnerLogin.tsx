// src/auth/learners/LearnerLogin.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthWrapper from "../shared/authWrapper";
import { validateEmail } from "../shared/authUtils";
import SocialAuthButton from "../shared/socialLoginButton";
import { toast } from "react-toastify";
import { EyeOff, Eye } from "react-feather";

export const LearnerLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  //I will need to Implement Trooteling later
  const handleSubmit = async (e: React.FormEvent) => {
    // Make handleSubmit async
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const formPayload = new FormData();
        formPayload.append("email", formData.email);
        formPayload.append("password", formData.password);

        const response = await fetch(`${import.meta.env.VITE_Base_URL}/login`, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formPayload,
        });

        const data = await response.json();
        const userData = data["authenticated user"];
        // Store token and user data
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("user: ", data);

        if (!response.ok) {
          throw new Error(data.message || "Login failed");
        } else if (userData.user_type === "tutor") {
          throw new Error("You are already a tutor");
          toast.error("You are already a tutor");
        }
        toast.success("Login successful!");

        setTimeout(() => {
          navigate("/LearnerHomePage");
        }, 1000);
      } catch (error: any) {
        setFormError(error.message || "Login Failed, please try again");
        toast.error(error.message || "Login Failed, Please try again");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 8 characters";
    }
    setErrors(newErrors);
    return newErrors;
  };

  return (
    <AuthWrapper
      title="Welcome Back, Learner"
      subtitle="Sign in to continue your learning journey"
    >
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Email Input */}
        <p className="my-1 text-sm text-red-600">{formError}</p>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className={`mt-1 block w-full px-4 py-3 border rounded-lg ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className={`w-full px-4 py-3 border rounded-lg ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        {/* Forgot Password Link */}
        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-teal-600 hover:text-teal-700"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>

        {/* Social Login */}
        <SocialAuthButton />
      </form>

      {/* Sign Up Prompt */}
      <div className="mt-8 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/auth/learner-registration"
          className="text-teal-600 font-semibold hover:text-teal-700"
        >
          Sign up
        </Link>
      </div>
    </AuthWrapper>
  );
};

// src/auth/learners/LearnerRegister.tsx
import { useState, useRef, useEffect } from "react";
import AuthWrapper from "../shared/authWrapper";
import SocialAuthButtons from "../shared/socialLoginButton";
import { validateEmail, validatePassword } from "../shared/authUtils";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { User, Mail, Lock, MapPin, Camera, Eye, EyeOff, Phone } from "react-feather";

const TutorRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone_number: "",
    whatsapp_number: "",
    user_type: "tutor",
    location: "",
    profile_image: null as File | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Live validation for password fields
  useEffect(() => {
    const passwordError = validatePassword(formData.password) || "";
    let confirmationError = "";
    
    if (formData.password_confirmation) {
      confirmationError = formData.password !== formData.password_confirmation 
        ? "Passwords do not match" 
        : "";
    } else {
      confirmationError = "Confirm password is required";
    }

    setErrors(prev => ({
      ...prev,
      password: passwordError,
      password_confirmation: confirmationError
    }));
  }, [formData.password, formData.password_confirmation]);

  const validateField = (name: string, value: string) => {
    let error = "";
    
    switch (name) {
      case "name":
        error = value.trim() ? "" : "Name is required";
        break;
      case "email":
        error = validateEmail(value) ? "" : "Invalid email address";
        break;
      case "phone_number":
        error = value ? "" : "Phone number is required";
        break;
      case "whatsapp_number":
        error = value ? "" : "WhatsApp Number is required"
        break;
      case "password":
        error = value ? "" : "Password is required"
        break;
      case "confirm_password":
        error = value ? "" : "Confirm Password is required"
        break;
      case "location":
        error = value ? "" : "Location is required";
        break;
    }

    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFormData(prev => ({ ...prev, profile_image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    // Final validation check
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const formPayload = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        if (value !== null) formPayload.append(key, value);
      }

      const response = await fetch(`${import.meta.env.VITE_Base_URL}/signup`, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formPayload,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      toast.success("Registration successful!");
      navigate('/learnerHomePage');
    } catch (error: any) {
      setFormError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!validateEmail(formData.email)) newErrors.email = "Invalid email address";
    if (!formData.phone_number) newErrors.phone_number = "Phone number is required";
    if (!formData.whatsapp_number) newErrors.whatsapp_number = "Whatsapp number is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.password_confirmation) newErrors.password_confirmation = "Confirm password is required";
    
    setErrors(newErrors);
    return newErrors;
  };

  return (
    <AuthWrapper
      isTutor={true}
      title="Become a Tutor Today"
      subtitle="Create your free Tutor account"
    >
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <p className='text-red-600 text-sm my-2'>{formError}</p>

          {/* Profile Image Upload */}
          <div className="flex justify-center">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden border-2 border-dashed border-gray-300 hover:border-teal-600 transition-colors">
                {formData.profile_image ? (
                  <img 
                    src={URL.createObjectURL(formData.profile_image)} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-500">
                    <User size={40} />
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                />
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-teal-600 text-white rounded-full p-1.5 hover:bg-teal-700 transition-colors shadow-sm"
              >
                <Camera size={16} />
              </button>
            </div>
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900" size={20} />
              <input
                type="text"
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={(e) => validateField("name", e.target.value)}
                className={`pl-10 mt-1 block w-full px-4 py-3 border rounded-lg ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-teal-500 focus:border-teal-500`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900" size={20} />
              <input
                type="email"
                placeholder="Enter Your Email Address"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={(e) => validateField("email", e.target.value)}
                className={`pl-10 mt-1 block w-full px-4 py-3 border rounded-lg ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-teal-500 focus:border-teal-500`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
          </div>

          {/* Phone Number Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <div className="mt-1">
              <div className="relative">
                <input
                  type="tel"
                  placeholder="Enter Your Phone Number"
                  value={formData.phone_number}
                  onChange={(e) => handleChange("phone_number", e.target.value)}
                  onBlur={(e) => validateField("phone_number", e.target.value)}
                  className={`pl-10 w-full px-4 py-3 border rounded-lg ${
                    errors.phone_number ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-teal-500 focus:border-teal-500`}
                />
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900 h-5 w-5" />
              </div>
              {errors.phone_number && <p className="mt-1 text-sm text-red-600">{errors.phone_number}</p>}
            </div>
          </div>

           {/* Phone Number Input */}
           <div>
            <label className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
            <div className="mt-1">
              <div className="relative">
                <input
                  type="tel"
                  placeholder="Enter Your WhatsApp Number"
                  value={formData.whatsapp_number}
                  onChange={(e) => handleChange("whatsapp_number", e.target.value)}
                  onBlur={(e) => validateField("whatsapp_number", e.target.value)}
                  className={`pl-10 w-full px-4 py-3 border rounded-lg ${
                    errors.phone_number ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-teal-500 focus:border-teal-500`}
                />
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900 h-5 w-5" />
              </div>
              {errors.phone_number && <p className="mt-1 text-sm text-red-600">{errors.whatsapp_number}</p>}
            </div>
          </div>

          {/* Location Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <div className="relative mt-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900 z-10" size={20} />
              <input
                type="text"
                placeholder="Enter your location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                onBlur={(e) => validateField("location", e.target.value)}
                className={`pl-10 mt-1 block w-full px-4 py-3 border rounded-lg ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-teal-500 focus:border-teal-500`}
              />
              </div>
              {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className={`pl-10 w-full px-4 py-3 border rounded-lg ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-teal-500 focus:border-teal-500`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900" size={20} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Your Password"
                value={formData.password_confirmation}
                onChange={(e) => setFormData(prev => ({ ...prev, password_confirmation: e.target.value }))}
                className={`pl-10 w-full px-4 py-3 border rounded-lg ${
                  errors.password_confirmation ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-teal-500 focus:border-teal-500`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password_confirmation && (
              <p className="mt-1 text-sm text-red-600">{errors.password_confirmation}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating Account..." : "Create Learner Account"}
        </button>

        <SocialAuthButtons />
        <div className="mt-8 text-center text-sm text-gray-600">
          Already Registered?{" "}
          <Link
            className="text-teal-600 hover:text-teal-700 font-bold"
            to="/auth/learner-login"
          >
            Sign In
          </Link>
        </div>
      </form>
    </AuthWrapper>
  );
};

export default TutorRegister;


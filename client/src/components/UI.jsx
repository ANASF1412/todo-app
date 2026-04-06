import React, { useState } from "react";

export const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  label,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <div className="relative">
        {Icon && <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />}
        <input
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 ${Icon ? "pl-12" : ""} border-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            error ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:border-gray-300"
          }`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export const Button = ({
  children,
  loading = false,
  disabled = false,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseClass =
    "w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50",
    outline: "border-2 border-blue-500 text-blue-500 hover:bg-blue-50 disabled:opacity-50",
  };

  return (
    <button
      disabled={loading || disabled}
      className={`${baseClass} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
      {children}
    </button>
  );
};

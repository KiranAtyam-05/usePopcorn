import { createContext, useState, useCallback } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = useCallback((email, password) => {
    // Simple validation - in production, call backend API
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    if (!email.includes("@")) {
      throw new Error("Invalid email format");
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    // Simulate successful login
    const userData = { email, loginTime: new Date() };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
    return userData;
  }, []);

  const register = useCallback((email, password, confirmPassword, name) => {
    // Validation
    if (!email || !password || !confirmPassword || !name) {
      throw new Error("All fields are required");
    }
    if (!email.includes("@")) {
      throw new Error("Invalid email format");
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    // Just validate and return success message - don't auto-login
    // User will need to login manually on the login page
    return { email, name, message: "Registration successful! Please login with your credentials." };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

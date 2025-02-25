import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const IsAuthenticated = ({children}) => {
  const navigate = useNavigate();
  const isAuthenticated = () => {
    const token = localStorage.getItem("access_token");
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp > currentTime) {
        return true;
      } else {
        localStorage.removeItem("access_token");
        toast.warning("Session expired");
        return false;
      }
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("access_token"); // Clear invalid token
      return false;
    }
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/signin"); // Redirect to login if not authenticated
    }
  }, [navigate]);
  return isAuthenticated() ? <>{children}</> : null;
};

export default IsAuthenticated;

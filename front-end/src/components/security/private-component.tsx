import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export function PrivateComponent({ ...rest }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/sign-in");
    }
  }, [token]);

  if (!token) {
    return null;
  }
  return rest.children;
}

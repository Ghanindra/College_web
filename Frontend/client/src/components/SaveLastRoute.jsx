import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function SaveLastRoute() {
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("lastPath", location.pathname);
  }, [location]);

  return null;
}
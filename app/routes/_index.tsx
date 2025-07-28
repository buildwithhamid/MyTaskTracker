// app/routes/_index.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function IndexPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, []);

  return null;
}
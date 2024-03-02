import { useAuth } from "@/context/AuthProvider";

export default function Logout() {
  const { logout } = useAuth();

  logout();

  return null;
}

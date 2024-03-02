import { api } from "@/lib/api";
import { useEffect, useState } from "react";

interface IUser {
  id: string;
  name: string;
  email: string;
}

export default function Users() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    api
      .get("/users/list")
      .then((response) => response.data)
      .then((value) => setUsers(value));
  }, []);

  return users.map((user) => (
    <p key={user.id}>
      {user.name} - {user.email}
    </p>
  ));
}

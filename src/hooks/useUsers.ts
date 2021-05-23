import { useQuery } from "react-query";
import { api } from "../services/axios";

interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export async function getUsers() {
  const { data } = await api.get("users");

  const users = data.users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: new Date(user.created_at).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return users;
}

export function useUsers() {
  return useQuery<User[]>("users", getUsers, {
    staleTime: 1000 * 5, // 5 seconds
  });
}

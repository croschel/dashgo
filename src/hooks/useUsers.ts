import { useQuery } from "react-query";
import { api } from "../services/axios";

interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

interface GetUsersResponse {
  users: User[];
  totalCount: number;
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get("users", {
    params: {
      page,
    },
  });

  const totalCount = Number(headers["x-total-count"]);
  console.log(totalCount);

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

  return { users, totalCount };
}

export function useUsers(page) {
  return useQuery("users", () => getUsers(page), {
    staleTime: 1000 * 5, // 5 seconds
  });
}

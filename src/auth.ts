import { api } from "./lib/api";

export type IResponseUser = {
  id: string;
  name: string;
  isAdmin: boolean;
  token?: string;
  auth: {
    email: string;
    ra: string;
  };
};

export async function getUserByToken(token: string) {
  return api.get<IResponseUser>("/users").then((response) => response.data);
}

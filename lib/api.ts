import axios from "axios";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});

export const tagList = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

interface checkSessionRequest {
  success: boolean;
}

export const checkSession = async () => {
  const res = await nextServer.get<checkSessionRequest>("/auth/session");
  return res.data.success;
};

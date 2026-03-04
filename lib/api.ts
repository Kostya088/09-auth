import axios from "axios";

// const NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

// export const notesApi = axios.create({
//   baseURL: "http://localhost:3000/api",
//   headers: {
//     accept: "application/json",
//     Authorization: `Bearer ${NOTEHUB_TOKEN}`,
//   },
//   withCredentials: true,
// });

// axios.defaults.baseURL = "https://notehub-api.goit.study/docs";

export const nextServer = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const tagList = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

interface checkSessionRequest {
  success: boolean;
}

export const checkSession = async () => {
  const res = await nextServer.get<checkSessionRequest>("auth/session");
  return res.data.success;
};

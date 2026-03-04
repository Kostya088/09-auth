import { User } from "@/types/user";
import { nextServer } from "./api";
import { Note } from "@/types/note";

interface CheckSessionRequest {
  success: boolean;
}

export interface NotesApiResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page: number;
  query?: string;
  tag?: string;
}

export async function fetchNotes({
  page,
  query,
  tag,
}: FetchNotesParams): Promise<NotesApiResponse> {
  try {
    if (!tag || tag === "all") {
      const { data } = await nextServer.get<NotesApiResponse>("/notes", {
        params: { page, perPage: 12, search: query },
      });
      return data;
    }
    const { data } = await nextServer.get<NotesApiResponse>("/notes", {
      params: { page, perPage: 12, search: query, tag: tag },
    });
    return data;
  } catch (err) {
    console.error("Failed to fetch notes:", err);
    throw err;
  }
}

export async function fetchNoteById(id: Note["id"]) {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
}

export interface CreateNoteProps {
  title: string;
  content: string;
  tag: string;
}

export async function createNote(body: CreateNoteProps): Promise<Note> {
  try {
    const { data } = await nextServer.post<Note>("/notes", body);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
export async function deleteNote(id: Note["id"]): Promise<Note> {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
}

export async function register(data: RegisterRequest) {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export async function login(data: LoginRequest) {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
}
export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export async function getMe() {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
}

export interface UpdateUserRequest {
  username?: string;
  email?: string;
}

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>("/users/me", payload);
  return res.data;
};

import { Note } from "@/types/note";
import { FetchNotesParams, NotesApiResponse } from "./clientApi";
import { nextServer } from "./api";
import { User } from "@/types/user";
import { cookies } from "next/headers";
import { AxiosResponse } from "axios";

export async function fetchNotes({
  page,
  query,
  tag,
}: FetchNotesParams): Promise<NotesApiResponse> {
  try {
    const cookieStore = await cookies();
    const headers = {
      Cookie: cookieStore.toString(),
    };

    if (!tag || tag === "all") {
      const { data } = await nextServer.get<NotesApiResponse>("", {
        params: { page, perPage: 12, search: query },
        headers,
      });
      return data;
    }
    const { data } = await nextServer.get<NotesApiResponse>("", {
      params: { page, perPage: 12, search: query, tag: tag },
      headers,
    });
    return data;
  } catch (err) {
    console.error("Failed to fetch notes:", err);
    throw err;
  }
}

export async function fetchNoteById(id: Note["id"]): Promise<Note> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<Note>(`/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export interface CheckSessionRequest {
  success: boolean;
}

export const checkServerSession = async (): Promise<
  AxiosResponse<CheckSessionRequest>
> => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

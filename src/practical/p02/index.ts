import axios from "axios";

type PostSummary = { id: number; title: string };

export async function getPostsByUser(userId: number): Promise<PostSummary[]> {
  try {
    const url = "https://jsonplaceholder.typicode.com/posts";
    const res = await axios.get<unknown>(url);

    if (!Array.isArray(res.data)) return [];

    return res.data
      .filter((p: unknown): p is { userId: number; id: number; title: string } => {
        if (typeof p !== "object" || p === null) return false;

        const obj = p as Record<string, unknown>;
        return (
          typeof obj.userId === "number" &&
          typeof obj.id === "number" &&
          typeof obj.title === "string"
        );
      })
      .filter((p) => p.userId === userId)
      .map((p) => ({ id: p.id, title: p.title }));
  } catch {
    return [];
  }
}

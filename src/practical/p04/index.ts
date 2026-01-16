import axios from "axios";

interface Comment {
  postId?: number | null;
}

export async function countCommentsByPost(): Promise<Record<number, number>> {
  try {
    const res = await axios.get<Comment[]>(
      "https://jsonplaceholder.typicode.com/comments"
    );

    const comments = res.data;

    if (comments.length === 0) {
      return {};
    }

    return comments.reduce<Record<number, number>>((acc, comment) => {
      if (typeof comment.postId !== "number") {
        return acc;
      }

      acc[comment.postId] = (acc[comment.postId] ?? 0) + 1;
      return acc;
    }, {});
  } catch {
    return {};
  }
}

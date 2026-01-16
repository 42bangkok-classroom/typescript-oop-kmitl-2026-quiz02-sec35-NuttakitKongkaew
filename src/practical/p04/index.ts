import axios from "axios";

interface Comment {
  postId: number | null;
}

export async function countCommentsByPost(): Promise<Record<number, number>> {
  try {
    const response = await axios.get<Comment[]>(
      "https://jsonplaceholder.typicode.com/comments"
    );

    const comments = response.data;

    if (comments.length === 0) {
      return {};
    }

    return comments.reduce<Record<number, number>>((acc, comment) => {
      if (comment.postId === null || comment.postId === undefined) {
        return acc;
      }

      acc[comment.postId] = (acc[comment.postId] ?? 0) + 1;
      return acc;
    }, {});
  } catch {
    return {};
  }
}

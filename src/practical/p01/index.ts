import axios from "axios";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type EdgePost = Pick<Post, "id" | "title">;

export async function getEdgePosts(): Promise<EdgePost[]> {
  try {
    const res = await axios.get<Post[]>(
      "https://jsonplaceholder.typicode.com/posts"
    );

    const posts = res.data;

    if (posts.length === 0) return [];

    const first = posts[0];
    const last = posts[posts.length - 1];

    if (posts.length === 1) {
      return [first, first].map(({ id, title }) => ({ id, title }));
    }

    if (posts.length === 2) {
      return posts.map(({ id, title }) => ({ id, title }));
    }

    return [first, last].map(({ id, title }) => ({ id, title }));
  } catch (error) {
    throw error;
  }
}




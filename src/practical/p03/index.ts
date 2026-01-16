import axios from "axios";

type Post = {
  id: number;
  title: string;
};

type Comment = {
  postId: number;
};

type PostWithCommentCount = {
  postId: number;
  title: string;
  totalComments: number;
};

export async function mapPostWithCommentCount(): Promise<PostWithCommentCount[]> {
  try {
    const [postsRes, commentsRes] = await Promise.all([
      axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts"),
      axios.get<Comment[]>("https://jsonplaceholder.typicode.com/comments"),
    ]);

    const posts = postsRes.data;
    const comments = commentsRes.data;

    if (posts.length === 0) {
      return [];
    }

    return posts.map((post) => {
      const totalComments = comments.filter(
        (comment) => comment.postId === post.id
      ).length;

      return {
        postId: post.id,
        title: post.title,
        totalComments,
      };
    });
  } catch (error) {
    throw error;
  }
}


import { createContext, useContext, useState, type ReactNode } from "react";
import {
  posts as initialPosts,
  communities as initialCommunities,
  comments as initialComments,
  type Post,
  type Community,
  type Comment,
} from "../data/dummy";

export type { Post, Community, Comment };

interface DataContextType {
  posts: Post[];
  communities: Community[];
  comments: Comment[];
  addPost: (post: Omit<Post, "id" | "created_at" | "like_count" | "comment_count">) => number;
  addCommunity: (community: Omit<Community, "id" | "created_at">) => number;
  addComment: (comment: Omit<Comment, "id" | "created_at">) => void;
  getPostById: (id: number) => Post | undefined;
  getCommentsByPostId: (postId: number) => Comment[];
  getCommunityById: (id: number) => Community | undefined;
  getPostsByCommunityId: (communityId: number) => Post[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [communities, setCommunities] = useState<Community[]>(initialCommunities);
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const addPost = (post: Omit<Post, "id" | "created_at" | "like_count" | "comment_count">): number => {
    const id = Date.now();
    const newPost: Post = {
      ...post,
      id,
      created_at: new Date().toISOString(),
      like_count: 0,
      comment_count: 0,
    };
    setPosts((prev) => [newPost, ...prev]);
    return id;
  };

  const addCommunity = (community: Omit<Community, "id" | "created_at">): number => {
    const id = Date.now();
    const newCommunity: Community = {
      ...community,
      id,
      created_at: new Date().toISOString(),
    };
    setCommunities((prev) => [newCommunity, ...prev]);
    return id;
  };

  const addComment = (comment: Omit<Comment, "id" | "created_at">) => {
    const id = Date.now();
    const newComment: Comment = {
      ...comment,
      id,
      created_at: new Date().toISOString(),
    };
    setComments((prev) => [...prev, newComment]);
    // Update the post's comment_count
    setPosts((prev) =>
      prev.map((p) =>
        p.id === comment.post_id ? { ...p, comment_count: p.comment_count + 1 } : p
      )
    );
  };

  const getPostById = (id: number) => posts.find((p) => p.id === id);
  const getCommentsByPostId = (postId: number) => comments.filter((c) => c.post_id === postId);
  const getCommunityById = (id: number) => communities.find((c) => c.id === id);
  const getPostsByCommunityId = (communityId: number) =>
    posts.filter((p) => p.community_id === communityId);

  return (
    <DataContext.Provider
      value={{
        posts,
        communities,
        comments,
        addPost,
        addCommunity,
        addComment,
        getPostById,
        getCommentsByPostId,
        getCommunityById,
        getPostsByCommunityId,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
};

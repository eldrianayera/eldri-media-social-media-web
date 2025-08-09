import { useQuery } from "@tanstack/react-query";
import { type Post } from "./PostList";
import { supabase } from "../supabase-client";
import { LikeButton } from "./LikeButton";
import { CommentSection } from "./CommentSection";

interface Props {
  postId: number;
}

const fetchPostById = async (id: number): Promise<Post> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data as Post;
};

export const PostDetail = ({ postId }: Props) => {
  const { data, error, isLoading } = useQuery<Post, Error>({
    queryKey: ["post", postId],
    queryFn: () => fetchPostById(postId),
  });

  if (isLoading) {
    return <div> Loading posts...</div>;
  }

  if (error) {
    return <div> Error: {error.message}</div>;
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto px-4">
      <h2
        className="text-6xl font-bold mb-6 text-center bg-clip-text text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--primary)), hsl(var(--secondary)))",
        }}
      >
        {data?.title}
      </h2>

      {data?.image_url && (
        <img
          src={data.image_url}
          alt={data?.title}
          className="mt-4 rounded-lg object-cover w-full max-h-96 shadow-md"
        />
      )}

      <p className="text-foreground/80 leading-relaxed text-lg">
        {data?.content}
      </p>

      <p className="text-foreground/60 text-sm italic">
        Posted on: {new Date(data!.created_at).toLocaleDateString()}
      </p>

      <div className="pt-4 border-t border-border">
        <LikeButton postId={postId} />
      </div>

      <div className="pt-6 border-t border-border">
        <CommentSection postId={postId} />
      </div>
    </div>
  );
};

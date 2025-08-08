import { useQuery } from "@tanstack/react-query";
import type { Post } from "./PostList";
import { supabase } from "../supabase-client";
import { PostItem } from "./PostItem";

interface Props {
  communityId: number;
}

interface PostWithCommunity extends Post {
  communities: {
    name: string;
  };
}

const fetchCommunityPosts = async (
  communityId: number
): Promise<PostWithCommunity[]> => {
  const { error, data } = await supabase
    .from("posts")
    .select("*, communities(name)")
    .eq("community_id", communityId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data as PostWithCommunity[];
};

export const CommunityDisplay = ({ communityId }: Props) => {
  const { data, error, isLoading } = useQuery<PostWithCommunity[], Error>({
    queryKey: ["community", communityId],
    queryFn: () => fetchCommunityPosts(communityId),
  });

  if (error) throw new Error(error.message);

  if (isLoading) return <div>Loading posts...</div>;

  return (
    <div>
      <h2>Community Posts</h2>
      {data && data.length > 0 ? (
        <div>
          {data.map((post, key) => (
            <PostItem key={key} post={post} />
          ))}
        </div>
      ) : (
        <p> No post in this community yet... </p>
      )}
    </div>
  );
};

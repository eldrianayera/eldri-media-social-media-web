import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { PostItem } from "./PostItem";
import { type Post } from "./PostList";

interface Props {
  communityId: number;
}

interface CommunityData {
  name: string;
  posts: Post[];
}

const fetchCommunityData = async (
  communityId: number
): Promise<CommunityData> => {
  const { data, error } = await supabase
    .from("communities")
    .select("name, posts(*)") 
    .eq("id", communityId)
    .single();

  if (error) throw new Error(error.message);

  return { name: data.name, posts: data.posts || [] };
};

export const CommunityDisplay = ({ communityId }: Props) => {
  const { data, error, isLoading } = useQuery<CommunityData, Error>({
    queryKey: ["communityData", communityId],
    queryFn: () => fetchCommunityData(communityId),
  });

  if (isLoading) {
    return <div className="text-center py-4">Loading community...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-4">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-6xl font-bold mb-6 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        {data?.name}
      </h2>

      {data!.posts.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center">
          {data!.posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">
          No posts in this community yet.
        </p>
      )}
    </div>
  );
};

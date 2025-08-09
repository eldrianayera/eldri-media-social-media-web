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
      <h2 className="page-header mb-12 p-5">{data?.name}</h2>
      {data!.posts.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center">
          {data!.posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-foreground/60">
          No posts in this community yet.
        </p>
      )}
    </div>
  );
};

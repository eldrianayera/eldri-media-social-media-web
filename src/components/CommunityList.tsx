import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { Link } from "react-router";

export interface Community {
  id: number;
  name: string;
  description: string;
  created_at: string;
}
export const fetchCommunities = async (): Promise<Community[]> => {
  const { data, error } = await supabase
    .from("communities")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Community[];
};

export const CommunityList = () => {
  const { data, error, isLoading } = useQuery<Community[], Error>({
    queryKey: ["communities"],
    queryFn: fetchCommunities,
  });

  if (isLoading)
    return <div className="text-center py-4">Loading communities...</div>;
  if (error)
    return (
      <div className="text-center text-red-500 py-4">
        Error: {error.message}
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto space-y-6 px-4">
      {data?.map((community) => (
        <div
          key={community.id}
          className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-transform duration-300 ease-in-out cursor-pointer"
        >
          <Link
            to={`/community/${community.id}`}
            className="text-2xl font-semibold hover:text-primary "
          >
            {community.name}
          </Link>
          <p className="text-foreground/70 mt-3 leading-relaxed">
            {community.description}
          </p>
        </div>
      ))}
    </div>
  );
};

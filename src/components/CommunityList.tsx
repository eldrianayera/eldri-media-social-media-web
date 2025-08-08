import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { Link } from "react-router";

export interface Community {
  id: number;
  description: string;
  name: string;
  created_at: string;
}

export const fetchCommunities = async (): Promise<Community[]> => {
  const { error, data } = await supabase
    .from("communities")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
};

export const CommunityList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["communities"],
    queryFn: fetchCommunities,
  });

  if (isLoading) return <div>Loading communities...</div>;

  if (error) {
    return <div> Error: {error.message} </div>;
  }

  return (
    <div>
      {data?.map((community, key) => (
        <div key={key}>
          <Link to="/community"> {community.name} </Link>
          <p> {community.description} </p>
        </div>
      ))}
    </div>
  );
};

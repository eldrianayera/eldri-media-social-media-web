import { useState } from "react";
import { supabase } from "../supabase-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

interface CommunityInput {
  name: string;
  description: string;
}

const createCommunity = async (community: CommunityInput) => {
  const { error } = await supabase.from("communities").insert(community);

  if (error) throw new Error(error.message);
};

export const CreateCommunity = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: createCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      navigate("/communities");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ name, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create nEW Community </h2>
      <div>
        <label htmlFor="name">Community Name</label>
        <input
          type="text"
          name="name"
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          required
          rows={3}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>
      <button> Create Community </button>
    </form>
  );
};

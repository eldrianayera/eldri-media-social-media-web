import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../supabase-client";

interface CommunityInput {
  name: string;
  description: string;
}
const createCommunity = async (community: CommunityInput) => {
  const { error, data } = await supabase.from("communities").insert(community);

  if (error) throw new Error(error.message);
  return data;
};

export const CreateCommunity = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
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
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
      <h2 className="page-header">Create New Community</h2>

      <div>
        <label
          htmlFor="name"
          className="block mb-2 font-medium text-foreground"
        >
          Community Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-border bg-background p-2 rounded text-foreground"
          required
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block mb-2 font-medium text-foreground"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-border bg-background p-2 rounded text-foreground"
          rows={3}
        />
      </div>
      <button
        type="submit"
        className="bg-primary text-primary-foreground px-4 py-2 rounded cursor-pointer"
      >
        {isPending ? "Creating..." : "Create Community"}
      </button>
      {isError && (
        <p className="text-destructive mt-2">Error creating community.</p>
      )}
    </form>
  );
};

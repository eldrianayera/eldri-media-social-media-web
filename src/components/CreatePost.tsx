import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, type ChangeEvent } from "react";
import { supabase } from "../supabase-client";
import { useAuth } from "../context/AuthContext";
import { fetchCommunities } from "./CommunityList";
import { useNavigate } from "react-router";

interface PostInput {
  title: string;
  content: string;
  avatar_url: string | null;
  community_id: number | null;
}

const createPost = async (post: PostInput, imageFile: File) => {
  const filePath = `${post.title}-${Date.now()}-${imageFile.name}`;

  const { error: uploadError } = await supabase.storage
    .from("post-images")
    .upload(filePath, imageFile);

  if (uploadError) throw new Error(uploadError.message);

  const { data: publicURLData } = supabase.storage
    .from("post-images")
    .getPublicUrl(filePath);

  const { data, error } = await supabase
    .from("posts")
    .insert({ ...post, image_url: publicURLData.publicUrl });

  if (error) throw new Error(error.message);

  return data;
};

export const CreatePost = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [communityId, setCommunityId] = useState<number | null>(null);

  const navigate = useNavigate();

  const { user } = useAuth();

  const { data: communities } = useQuery({
    queryKey: ["communities"],
    queryFn: fetchCommunities,
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data: { post: PostInput; imageFile: File }) => {
      return createPost(data.post, data.imageFile);
    },

    onSuccess: () => {
      navigate(`/`);
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select image ...");
      return;
    }
    mutate({
      post: {
        title,
        content,
        avatar_url: user?.user_metadata.avatar_url || null,
        community_id: communityId,
      },
      imageFile: selectedFile,
    });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleCommunityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setCommunityId(value ? Number(value) : null);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block mb-2 font-medium text-foreground"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-border bg-background p-2 rounded text-foreground"
          required
        />
      </div>
      <div>
        <label
          htmlFor="content"
          className="block mb-2 font-medium text-foreground"
        >
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-border bg-background p-2 rounded text-foreground"
          rows={5}
          required
        />
      </div>

      <div>
        <label
          htmlFor="community"
          className="block mb-2 font-medium text-foreground"
        >
          Select Community
        </label>
        <select
          name="community"
          id="community"
          onChange={handleCommunityChange}
          className="w-full border border-border bg-background p-2 rounded text-foreground"
        >
          <option value={""}> -- Choose a Community -- </option>
          {communities?.map((community, key) => (
            <option key={key} value={community.id}>
              {community.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="image"
          className="block mb-2 font-medium text-foreground"
        >
          Upload Image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-foreground"
        />
      </div>

      <button
        type="submit"
        className="bg-primary text-primary-foreground px-4 py-2 rounded cursor-pointer"
      >
        {isPending ? "Creating..." : "Create Post"}
      </button>

      {isError && <p className="text-destructive mt-2">Error creating post.</p>}
    </form>
  );
};

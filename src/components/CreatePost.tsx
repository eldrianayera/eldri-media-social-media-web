import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router";
import { useData } from "../context/DataContext";

const FONT = "'Pin Sans', -apple-system, system-ui, sans-serif";

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: FONT,
  fontSize: "14px",
  fontWeight: 700,
  color: "#211922",
  marginBottom: "6px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "#ffffff",
  border: "1px solid #e5e5e0",
  borderRadius: "16px",
  padding: "11px 15px",
  fontFamily: FONT,
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: 1.4,
  color: "#211922",
  boxSizing: "border-box",
  outline: "none",
  transition: "border-color 0.15s",
};

export const CreatePost = () => {
  const { addPost, communities } = useData();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [communityId, setCommunityId] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const id = addPost({
      title: title.trim(),
      content: content.trim(),
      image_url: imagePreview ?? "",
      avatar_url: undefined,
      community_id: communityId,
    });

    navigate(`/post/${id}`);
  };

  const focusBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "#435ee5";
  };
  const blurBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "#e5e5e0";
  };

  const canSubmit = title.trim() && content.trim();

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-5">
      {/* Title */}
      <div>
        <label style={labelStyle}>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your post a title…"
          style={inputStyle}
          onFocus={focusBorder}
          onBlur={blurBorder}
          required
        />
      </div>

      {/* Content */}
      <div>
        <label style={labelStyle}>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post…"
          rows={5}
          style={{ ...inputStyle, resize: "vertical" }}
          onFocus={focusBorder}
          onBlur={blurBorder}
          required
        />
      </div>

      {/* Community */}
      <div>
        <label style={labelStyle}>Community</label>
        <select
          value={communityId ?? ""}
          onChange={(e) => setCommunityId(e.target.value ? Number(e.target.value) : null)}
          style={inputStyle}
          onFocus={focusBorder}
          onBlur={blurBorder}
        >
          <option value="">— Choose a community —</option>
          {communities.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Image */}
      <div>
        <label style={labelStyle}>Image</label>
        {imagePreview ? (
          <div style={{ position: "relative" }}>
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                width: "100%",
                maxHeight: "280px",
                objectFit: "cover",
                borderRadius: "20px",
                border: "1px solid #e5e5e0",
              }}
            />
            <button
              type="button"
              onClick={() => { setImageFile(null); setImagePreview(null); }}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                fontFamily: FONT,
                fontSize: "12px",
                padding: "4px 10px",
                borderRadius: "12px",
                border: "none",
                backgroundColor: "#211922",
                color: "#ffffff",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        ) : (
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              border: "2px dashed #e5e5e0",
              borderRadius: "20px",
              padding: "40px 24px",
              backgroundColor: "#f6f6f3",
              cursor: "pointer",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#91918c")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e5e5e0")}
          >
            <span style={{ fontFamily: FONT, fontSize: "14px", color: "#62625b" }}>
              Click to upload an image
            </span>
            <span style={{ fontFamily: FONT, fontSize: "12px", color: "#91918c" }}>
              PNG, JPG, GIF, WebP
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>
        )}
        {imageFile && !imagePreview && (
          <p style={{ fontFamily: FONT, fontSize: "12px", color: "#62625b", marginTop: "6px" }}>
            {imageFile.name}
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={!canSubmit}
          style={{
            fontFamily: FONT,
            fontSize: "12px",
            fontWeight: 400,
            padding: "6px 14px",
            borderRadius: "16px",
            border: "none",
            backgroundColor: canSubmit ? "#e60023" : "#e5e5e0",
            color: canSubmit ? "#ffffff" : "#91918c",
            cursor: canSubmit ? "pointer" : "default",
            transition: "background-color 0.15s, color 0.15s",
          }}
        >
          Publish
        </button>
      </div>
    </form>
  );
};

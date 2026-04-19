import { useState } from "react";
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

export const CreateCommunity = () => {
  const { addCommunity } = useData();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addCommunity({ name: name.trim(), description: description.trim() });
    navigate("/communities");
  };

  const focusBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "#435ee5";
  };
  const blurBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "#e5e5e0";
  };

  const canSubmit = name.trim();

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-5">
      <h2 className="page-header">New Community</h2>

      <div>
        <label style={labelStyle}>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name your community…"
          style={inputStyle}
          onFocus={focusBorder}
          onBlur={blurBorder}
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What's this community about?"
          rows={3}
          style={{ ...inputStyle, resize: "vertical" }}
          onFocus={focusBorder}
          onBlur={blurBorder}
        />
      </div>

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
          Create
        </button>
      </div>
    </form>
  );
};

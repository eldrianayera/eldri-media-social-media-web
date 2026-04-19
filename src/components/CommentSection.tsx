import { useState } from "react";
import { useData, type Comment } from "../context/DataContext";
import { CommentItem } from "./CommentItem";

const FONT = "'Pin Sans', -apple-system, system-ui, sans-serif";

interface Props {
  postId: number;
}

export type { Comment };

const buildCommentTree = (
  flatComments: Comment[]
): (Comment & { children?: Comment[] })[] => {
  const map = new Map<number, Comment & { children?: Comment[] }>();
  const roots: (Comment & { children?: Comment[] })[] = [];

  flatComments.forEach((c) => map.set(c.id, { ...c, children: [] }));
  flatComments.forEach((c) => {
    if (c.parent_comment_id) {
      map.get(c.parent_comment_id)?.children?.push(map.get(c.id)!);
    } else {
      roots.push(map.get(c.id)!);
    }
  });

  return roots;
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "#ffffff",
  border: "1px solid #e5e5e0",
  borderRadius: "16px",
  padding: "11px 15px",
  fontFamily: FONT,
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: 1.5,
  color: "#211922",
  boxSizing: "border-box",
  outline: "none",
  resize: "vertical",
  transition: "border-color 0.15s",
};

export const CommentSection = ({ postId }: Props) => {
  const { getCommentsByPostId, addComment } = useData();
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const flat = getCommentsByPostId(postId);
  const commentTree = buildCommentTree(flat);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addComment({
      post_id: postId,
      parent_comment_id: null,
      content: text.trim(),
      user_id: "guest",
      author: name.trim() || "Anonymous",
    });
    setText("");
    setName("");
  };

  return (
    <div>
      <h3
        style={{
          fontFamily: FONT,
          fontSize: "1.1rem",
          fontWeight: 700,
          letterSpacing: "-0.5px",
          color: "#211922",
          marginBottom: "20px",
        }}
      >
        {flat.length > 0
          ? `${flat.length} Comment${flat.length !== 1 ? "s" : ""}`
          : "Comments"}
      </h3>

      {/* Comment form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "28px" }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          style={{ ...inputStyle, marginBottom: "8px", resize: "none" }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#435ee5")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e5e0")}
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment…"
          rows={3}
          style={{ ...inputStyle, marginBottom: "10px" }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#435ee5")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e5e0")}
        />
        <button
          type="submit"
          disabled={!text.trim()}
          style={{
            fontFamily: FONT,
            fontSize: "12px",
            fontWeight: 400,
            padding: "6px 14px",
            borderRadius: "16px",
            border: "none",
            backgroundColor: text.trim() ? "#e60023" : "#e5e5e0",
            color: text.trim() ? "#ffffff" : "#91918c",
            cursor: text.trim() ? "pointer" : "default",
            transition: "background-color 0.15s, color 0.15s",
          }}
        >
          Post
        </button>
      </form>

      {commentTree.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {commentTree.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <p style={{ fontFamily: FONT, fontSize: "14px", color: "#62625b" }}>
          No comments yet. Be the first.
        </p>
      )}
    </div>
  );
};

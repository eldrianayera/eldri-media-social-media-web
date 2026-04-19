import { useState } from "react";
import { type Comment } from "../data/dummy";
import { ChevronDown, ChevronUp } from "lucide-react";

const FONT = "'Pin Sans', -apple-system, system-ui, sans-serif";

interface Props {
  comment: Comment & { children?: Comment[] };
}

export const CommentItem = ({ comment }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div style={{ paddingLeft: "16px", borderLeft: "3px solid #e5e5e0" }}>
      {/* Author + timestamp */}
      <div className="flex items-center gap-2 mb-1">
        <span
          style={{
            fontFamily: FONT,
            fontSize: "12px",
            fontWeight: 700,
            color: "#211922",
          }}
        >
          {comment.author}
        </span>
        <span style={{ fontSize: "12px", color: "#91918c", fontFamily: FONT }}>
          ·{" "}
          {new Date(comment.created_at).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      {/* Content */}
      <p
        style={{
          fontFamily: FONT,
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: 1.5,
          color: "#211922",
          margin: "0 0 8px 0",
        }}
      >
        {comment.content}
      </p>

      {/* Replies toggle */}
      {comment.children && comment.children.length > 0 && (
        <div>
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="flex items-center gap-1"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: FONT,
              fontSize: "12px",
              color: "#62625b",
              padding: "2px 0",
              marginBottom: "8px",
            }}
          >
            {isCollapsed ? (
              <>
                <ChevronDown size={13} />
                <span>
                  Show {comment.children.length}{" "}
                  {comment.children.length === 1 ? "reply" : "replies"}
                </span>
              </>
            ) : (
              <>
                <ChevronUp size={13} />
                <span>Hide replies</span>
              </>
            )}
          </button>

          {!isCollapsed && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {comment.children.map((child) => (
                <CommentItem key={child.id} comment={child} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

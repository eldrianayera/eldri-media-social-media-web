import { useState } from "react";

const FONT = "'Pin Sans', -apple-system, system-ui, sans-serif";

interface Props {
  initialLikes: number;
}

export const LikeButton = ({ initialLikes }: Props) => {
  const [vote, setVote] = useState<1 | -1 | null>(null);
  const [likes, setLikes] = useState(initialLikes);

  const handleVote = (value: 1 | -1) => {
    if (vote === value) {
      setVote(null);
      setLikes((prev) => prev + (value === 1 ? -1 : 1));
    } else {
      if (vote !== null) setLikes((prev) => prev + (value === 1 ? 2 : -2));
      else setLikes((prev) => prev + (value === 1 ? 1 : -1));
      setVote(value);
    }
  };

  const primaryStyle: React.CSSProperties = {
    fontFamily: FONT,
    fontSize: "12px",
    fontWeight: 400,
    padding: "6px 14px",
    borderRadius: "16px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "opacity 0.15s",
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => handleVote(1)}
        style={{
          ...primaryStyle,
          backgroundColor: vote === 1 ? "#e60023" : "#e5e5e0",
          color: vote === 1 ? "#ffffff" : "#211922",
        }}
      >
        <span>👍</span>
        <span>{likes}</span>
      </button>
      <button
        onClick={() => handleVote(-1)}
        style={{
          ...primaryStyle,
          backgroundColor: vote === -1 ? "#211922" : "#e5e5e0",
          color: vote === -1 ? "#ffffff" : "#211922",
        }}
      >
        <span>👎</span>
      </button>
    </div>
  );
};

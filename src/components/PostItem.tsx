import { Link } from "react-router";
import type { Post } from "../data/dummy";
import { Heart, MessageCircle } from "lucide-react";
import { useData } from "../context/DataContext";

const COMMUNITY_COLORS: Record<number, { bg: string; text: string }> = {
  1: { bg: "rgba(234,179,8,0.18)",   text: "#92620a" },  // Family — amber
  2: { bg: "rgba(59,130,246,0.18)",  text: "#1d4ed8" },  // Travel — blue
  3: { bg: "rgba(34,197,94,0.18)",   text: "#15803d" },  // Food — green
  4: { bg: "rgba(168,85,247,0.18)",  text: "#7e22ce" },  // Hobbies — purple
  5: { bg: "rgba(239,68,68,0.18)",   text: "#b91c1c" },  // Wellness — red
};

const FONT = "'Pin Sans', -apple-system, system-ui, sans-serif";

interface Props {
  post: Post;
}

const formatCount = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

export const PostItem = ({ post }: Props) => {
  const { getCommunityById } = useData();
  const community = post.community_id ? getCommunityById(post.community_id) : undefined;
  const color = post.community_id ? COMMUNITY_COLORS[post.community_id] : undefined;

  return (
    <Link to={`/post/${post.id}`} style={{ textDecoration: "none", display: "block" }}>
      <article
        className="group"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          overflow: "hidden",
          border: "1px solid #f0f0ed",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          height: "264px",
          display: "flex",
          flexDirection: "column",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(-4px)";
          el.style.boxShadow = "0 12px 32px rgba(0,0,0,0.10)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "none";
        }}
      >
        {/* Image */}
        <div style={{ position: "relative", overflow: "hidden", height: "180px", backgroundColor: "#f6f6f3" }}>
          {post.image_url ? (
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div style={{ width: "100%", height: "100%", backgroundColor: "#e5e5e0" }} />
          )}

          {/* Community badge */}
          {community && color && (
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                backgroundColor: color.bg,
                backdropFilter: "blur(6px)",
                borderRadius: "20px",
                padding: "3px 10px",
              }}
            >
              <span style={{ fontFamily: FONT, fontSize: "11px", fontWeight: 700, color: color.text }}>
                {community.name}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: "14px 14px 12px", flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <h3
            className="line-clamp-2"
            style={{
              fontFamily: FONT,
              fontSize: "14px",
              fontWeight: 700,
              lineHeight: 1.45,
              color: "#211922",
              margin: "0 0 10px 0",
            }}
          >
            {post.title}
          </h3>

          {/* Footer row */}
          <div className="flex items-center justify-between">
            {/* Avatar */}
            <div>
              {post.avatar_url ? (
                <img
                  src={post.avatar_url}
                  alt="Avatar"
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #e5e5e0",
                    display: "block",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    backgroundColor: "#e0e0d9",
                  }}
                />
              )}
            </div>

            {/* Counts */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Heart size={12} style={{ color: "#e60023" }} />
                <span style={{ fontFamily: FONT, fontSize: "12px", color: "#62625b" }}>
                  {formatCount(post.like_count)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle size={12} style={{ color: "#91918c" }} />
                <span style={{ fontFamily: FONT, fontSize: "12px", color: "#62625b" }}>
                  {formatCount(post.comment_count)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

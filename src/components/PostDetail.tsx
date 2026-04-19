import { useData } from "../context/DataContext";
import { LikeButton } from "./LikeButton";
import { CommentSection } from "./CommentSection";
import { NoData } from "./NoData";

const FONT = "'Pin Sans', -apple-system, system-ui, sans-serif";

interface Props {
  postId: number;
}

export const PostDetail = ({ postId }: Props) => {
  const { getPostById } = useData();
  const data = getPostById(postId);

  if (!data) {
    return <NoData message="Post not found" detail="This post doesn't exist." />;
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      {data.image_url && (
        <div style={{ marginBottom: "24px" }}>
          <img
            src={data.image_url}
            alt={data.title}
            className="w-full object-cover"
            style={{ borderRadius: "32px", maxHeight: "560px" }}
          />
        </div>
      )}

      <h1
        style={{
          fontFamily: FONT,
          fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
          fontWeight: 600,
          lineHeight: "normal",
          color: "#211922",
          margin: "0 0 12px 0",
        }}
      >
        {data.title}
      </h1>

      <div className="flex items-center gap-3 mb-6">
        {data.avatar_url && (
          <img
            src={data.avatar_url}
            alt="Avatar"
            className="rounded-full object-cover"
            style={{ width: "40px", height: "40px", border: "2px solid #e5e5e0" }}
          />
        )}
        <div>
          <p style={{ fontFamily: FONT, fontSize: "14px", fontWeight: 700, color: "#211922", margin: 0 }}>
            Anonymous
          </p>
          <p style={{ fontFamily: FONT, fontSize: "12px", color: "#62625b", margin: 0 }}>
            {new Date(data.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid #e5e5e0",
          paddingTop: "24px",
          marginBottom: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {data.content.split("\n\n").map((paragraph, i) => (
          <p
            key={i}
            style={{
              fontFamily: FONT,
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: 1.55,
              color: "#211922",
              margin: 0,
            }}
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div style={{ borderTop: "1px solid #e5e5e0", paddingTop: "20px", marginBottom: "32px" }}>
        <LikeButton initialLikes={data.like_count} />
      </div>

      <div style={{ borderTop: "1px solid #e5e5e0", paddingTop: "24px" }}>
        <CommentSection postId={postId} />
      </div>
    </div>
  );
};

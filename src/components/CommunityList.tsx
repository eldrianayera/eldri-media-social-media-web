import { Link } from "react-router";
import { useData, type Community } from "../context/DataContext";

const FONT = "'Pin Sans', -apple-system, system-ui, sans-serif";

export type { Community };

export const CommunityList = () => {
  const { communities } = useData();

  return (
    <div className="max-w-3xl mx-auto space-y-4 px-2">
      {communities.map((community) => (
        <div
          key={community.id}
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e5e5e0",
            borderRadius: "20px",
            padding: "20px 24px",
            transition: "border-color 0.15s, box-shadow 0.15s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = "#91918c";
            el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = "#e5e5e0";
            el.style.boxShadow = "none";
          }}
        >
          <Link
            to={`/community/${community.id}`}
            style={{
              fontFamily: FONT,
              fontSize: "16px",
              fontWeight: 700,
              color: "#211922",
              textDecoration: "none",
              display: "block",
              marginBottom: "6px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#e60023";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#211922";
            }}
          >
            {community.name}
          </Link>
          <p
            style={{
              fontFamily: FONT,
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: 1.5,
              color: "#62625b",
              margin: 0,
            }}
          >
            {community.description}
          </p>
        </div>
      ))}
    </div>
  );
};

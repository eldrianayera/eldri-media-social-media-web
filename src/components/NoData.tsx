import { ImageOff } from "lucide-react";

const FONT = "'Pin Sans', -apple-system, system-ui, sans-serif";

interface Props {
  message?: string;
  detail?: string;
}

export const NoData = ({
  message = "Nothing to see here",
  detail = "Check back later or explore other boards.",
}: Props) => {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
      style={{ gap: "16px" }}
    >
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "#e0e0d9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ImageOff size={24} style={{ color: "#62625b" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <p
          style={{
            fontFamily: FONT,
            fontSize: "16px",
            fontWeight: 700,
            color: "#211922",
            margin: 0,
          }}
        >
          {message}
        </p>
        <p style={{ fontFamily: FONT, fontSize: "12px", color: "#62625b", margin: 0 }}>
          {detail}
        </p>
      </div>
    </div>
  );
};

import { PostList } from "../components/PostList";
import { useData } from "../context/DataContext";

const FONT = "'Pin Sans', -apple-system, system-ui, sans-serif";

export default function ExplorePage() {
  const { posts } = useData();
  const half = Math.ceil(posts.length / 2);
  const explorePosts = posts.slice(half);

  return (
    <div>
      <div className="px-2 mb-6">
        <h2
          style={{
            fontFamily: FONT,
            fontSize: "28px",
            fontWeight: 700,
            letterSpacing: "-1.2px",
            color: "#211922",
            margin: 0,
          }}
        >
          Explore
        </h2>
      </div>
      <PostList posts={explorePosts} />
    </div>
  );
}

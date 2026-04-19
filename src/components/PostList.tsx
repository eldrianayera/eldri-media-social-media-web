import { useEffect, useRef, useState } from "react";
import { useData, type Post } from "../context/DataContext";
import { PostItem } from "./PostItem";

export type { Post };

const PAGE_SIZE = 12;

function shuffled(arr: Post[]): Post[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const PostList = ({ posts: seedPosts }: { posts?: Post[] } = {}) => {
  const { posts: allPosts } = useData();
  const pool = seedPosts ?? allPosts;

  const [items, setItems] = useState<{ post: Post; key: string }[]>(() =>
    pool.slice(0, PAGE_SIZE).map((p, i) => ({ post: p, key: `${p.id}-0-${i}` }))
  );
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const batchRef = useRef(1);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true);
          // Small delay so the spinner is visible
          setTimeout(() => {
            const batch = batchRef.current;
            const next = shuffled(allPosts)
              .slice(0, PAGE_SIZE)
              .map((p, i) => ({ post: p, key: `${p.id}-${batch}-${i}` }));
            setItems((prev) => [...prev, ...next]);
            batchRef.current += 1;
            setLoading(false);
          }, 600);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loading, allPosts]);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-2">
        {items.map(({ post, key }) => (
          <PostItem post={post} key={key} />
        ))}
      </div>

      {/* Sentinel + spinner */}
      <div ref={sentinelRef} className="flex justify-center py-8">
        {loading && (
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              border: "3px solid #e5e5e0",
              borderTopColor: "#e60023",
              animation: "spin 0.7s linear infinite",
            }}
          />
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

import { PostList } from "../components/PostList";

export default function Home() {
  return (
    <div className="pt-10 mx-auto px-6">
      <h2 className="page-header">Recent Posts</h2>
      <div>
        <PostList />
      </div>
    </div>
  );
}

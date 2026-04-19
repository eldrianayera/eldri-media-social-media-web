import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import ExplorePage from "./pages/ExplorePage";
import { Navbar } from "./components/Navbar";
import { CreatePostPage } from "./pages/CreatePostPage";
import PostPage from "./pages/PostPage";
import { CreateCommunityPage } from "./pages/CreateCommunityPage";
import { CommunitiesPage } from "./pages/CommunitiesPage";
import { CommunityPage } from "./pages/CommunityPage";

function App() {
  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: "#ffffff" }}>
      <Navbar />
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/community/create" element={<CreateCommunityPage />} />
          <Route path="/communities" element={<CommunitiesPage />} />
          <Route path="/community/:id" element={<CommunityPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

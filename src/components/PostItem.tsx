import { Link } from "react-router";
import type { Post } from "./PostList";
import { LucideHeart, MessageCircle } from "lucide-react";

interface Props {
  post: Post;
}

export const PostItem = ({ post }: Props) => {
  return (
    <div className="relative group max-w-xs mx-auto text-background">
      {/* Soft subtle glow on hover */}
      <div
        className="absolute -inset-1 rounded-[20px] bg-gradient-to-tr from-[rgba(255,255,255,0.1)] 
                   via-[rgba(255,255,255,0.05)] to-[rgba(0,0,0,0.15)] opacity-0 
                   group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"
      ></div>

      <Link to={`/post/${post.id}`} className="block relative z-10">
        <div className="w-80 h-76 bg-foreground flex flex-col p-5 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 rounded-[20px]">
          {/* Header: Avatar and Title */}
          <div className="flex items-center space-x-4 mb-3">
            {post.avatar_url ? (
              <img
                src={post.avatar_url}
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover border border-border"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[hsl(var(--primary))]" />
            )}
            <h3
              className="text-lg font-semibold leading-tight truncate flex-1"
              title={post.title}
            >
              {post.title}
            </h3>
          </div>

          {/* Image Banner */}
          {post.image_url && (
            <div className="flex-1 mb-4">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full rounded-[16px] object-cover max-h-[140px] shadow-sm"
                loading="lazy"
                decoding="async"
              />
            </div>
          )}

          {/* Footer: Likes and Comments */}
          <div className="flex items-center gap-6 text-sm text-foreground/70 select-none">
            <div
              className="flex items-center gap-1 cursor-pointer hover:text-primary 
               transition-colors duration-200"
            >
              <LucideHeart className="w-5 h-5 text-[rgb(var(--background))]" />
              <span className="text-background">{post.like_count}</span>
            </div>
            <div
              className="flex items-center gap-1 cursor-pointer hover:text-primary 
               transition-colors duration-200"
            >
              <MessageCircle className="w-5 h-5 text-[rgb(var(--background))]" />
              <span className="text-background">{post.comment_count}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

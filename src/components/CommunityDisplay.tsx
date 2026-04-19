import { useData } from "../context/DataContext";
import { PostItem } from "./PostItem";
import { NoData } from "./NoData";

interface Props {
  communityId: number;
}

export const CommunityDisplay = ({ communityId }: Props) => {
  const { getCommunityById, getPostsByCommunityId } = useData();
  const community = getCommunityById(communityId);

  if (!community) {
    return <NoData message="Community not found" detail="This community doesn't exist." />;
  }

  const posts = getPostsByCommunityId(communityId);

  return (
    <div>
      <h2 className="page-header mb-8">{community.name}</h2>
      {posts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-2">
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <NoData message="No posts yet" detail="Be the first to post in this community." />
      )}
    </div>
  );
};

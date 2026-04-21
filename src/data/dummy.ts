export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url: string;
  avatar_url?: string;
  like_count: number;
  comment_count: number;
  community_id: number | null;
}

export interface Community {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface Comment {
  id: number;
  post_id: number;
  parent_comment_id: number | null;
  content: string;
  user_id: string;
  created_at: string;
  author: string;
}

export const communities: Community[] = [
  {
    id: 1,
    name: "Family & Parenting",
    description:
      "for the girlies and parentals living that chaotic family life — share the fails, the wins, and everything in between bc we're all just trying to survive",
    created_at: "2024-11-01T09:00:00Z",
  },
  {
    id: 2,
    name: "Travel & Adventures",
    description:
      "weekend getaways to months abroad — drop the hidden gems, the wild stories, and the stuff that only happens when u leave ur comfort zone",
    created_at: "2024-11-03T10:30:00Z",
  },
  {
    id: 3,
    name: "Food & Cooking",
    description:
      "recipes that slap, restaurant finds, kitchen disasters, and the meals that hit different — all cuisines, all skill levels, no gatekeeping",
    created_at: "2024-11-08T08:00:00Z",
  },
  {
    id: 4,
    name: "Hobbies & Creative Life",
    description:
      "gardening, art, knitting, woodworking, photography — share what u make and the serotonin that comes with it",
    created_at: "2024-11-12T14:00:00Z",
  },
  {
    id: 5,
    name: "Wellness & Personal Growth",
    description:
      "real talk about rest, habits, mental health, and becoming the person u actually want to be — no toxic positivity just authentic convos",
    created_at: "2024-11-20T11:00:00Z",
  },
];

export const posts: Post[] = (() => {
  const topics = [
    "coachella",
    "playlist",
    "gym",
    "matcha",
    "travel",
    "late night",
    "study",
    "side quest",
    "food",
    "routine",
    "running",
    "photos",
    "friends",
    "weekend",
  ];

  // const verbs = [
  //   "tried",
  //   "started",
  //   "found",
  //   "accidentally got into",
  //   "was influenced to try",
  //   "randomly decided to do",
  // ];

  const emotions = [
    "down bad fr",
    "confused af",
    "obsessed help",
    "not okay i-",
    "living for this",
    "questioning everything",
  ];

  const reactions = [
    "no bc why is this working",
    "genuinely concerned",
    "ate and left no crumbs",
    "never speaking of this again",
    "why am i laughing",
    "this feels illegal",
  ];

  const questions = [
    "is this normal",
    "be so fr rn",
    "am i the drama",
    "what did i just watch",
    "anyone else or just me",
  ];

  const contentBlocks = [
    (t: string) =>
      `saw ${t} on my fyp once\nnext thing i know it's 3am\n\n${emotions[Math.floor(Math.random() * emotions.length)]}`,

    (t: string) =>
      `me: just gonna try ${t}\nalso me: \n\n${reactions[Math.floor(Math.random() * reactions.length)]}`,

    (t: string) =>
      `${t} phase was supposed to be ironic\nit's not ironic anymore\n\n${questions[Math.floor(Math.random() * questions.length)]}`,

    (t: string) =>
      `not me explaining ${t} to my mom at midnight\n\nshe looked disappointed but idc`,

    (t: string) => `thought ${t} was mid\n\ni was incorrect\nso incorrect`,

    (t: string) =>
      `${t} seemed easy in tutorials\nmy reality: 💀\n\nbut kinda fun tho ngl`,

    (t: string) => `since when is ${t} my entire personality\n\nhelp`,

    (t: string) => `my entire day = ${t}\n\nproductivity? never heard of her`,

    (t: string) =>
      `${t} at 2am decisions hit different\n\nzero regrets`,

    (t: string) => `how did i end up here\n\noh right ${t}\n\nthis is my life now`,
  ];

  const titlePatterns = [
    (t: string) =>
      `got into ${t} and now i’m ${emotions[Math.floor(Math.random() * emotions.length)]}`,
    (t: string) => `${t} wasn’t supposed to go this hard`,
    (t: string) => `why is everyone doing ${t} suddenly`,
    (t: string) => `tried ${t} so u don’t have to`,
    (t: string) => `this ${t} situation got out of hand`,
    (t: string) => `${t} at 2am wasn’t the move`,
    (t: string) => `my ${t} phase is concerning me`,
    (t: string) => `not me becoming a ${t} person rn`,
    (t: string) => `${t} was supposed to be one time`,
    (t: string) => `${t} actually slapped fr`,
  ];

  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  return Array.from({ length: 200 }).map((_, i) => {
    const id = i + 1;

    const topic = topics[Math.floor(seededRandom(id) * topics.length)];

    const title =
      titlePatterns[Math.floor(seededRandom(id * 2) * titlePatterns.length)](
        topic,
      );

    const content =
      contentBlocks[Math.floor(seededRandom(id * 3) * contentBlocks.length)](
        topic,
      );

    const rand1 = seededRandom(id * 4);
    const rand2 = seededRandom(id * 5);
    const rand3 = seededRandom(id * 6);

    return {
      id,
      title,
      content,
      created_at: `2025-03-${String((id % 28) + 1).padStart(2, "0")}T10:00:00Z`,
      image_url: `https://picsum.photos/seed/${id}/800/450`,
      avatar_url: `https://i.pravatar.cc/40?img=${(id % 70) + 1}`,
      like_count: Math.floor(rand1 * 3000 + 100),
      comment_count: Math.floor(rand2 * 600 + 20),
      community_id: Math.floor(rand3 * 5) + 1,
    };
  });
})();

const data: Comment[] = [
  // Post 1
  {
    id: 1,
    post_id: 1,
    parent_comment_id: null,
    content:
      "bro this is literally me 💀 sintra was gorgeous but i remember nothing bc we were in survival mode the whole time",
    user_id: "u1",
    created_at: "2025-01-14T11:30:00Z",
    author: "mara_k",
  },
  {
    id: 2,
    post_id: 1,
    parent_comment_id: 1,
    content:
      "going back solo the next day was actually genius based move\nnobody talks about this",
    user_id: "u2",
    created_at: "2025-01-14T12:00:00Z",
    author: "travel_jonas",
  },
  {
    id: 3,
    post_id: 1,
    parent_comment_id: 1,
    content:
      "wait what stroller did u use\nwe're doing a similar trip and gate checking has been a nightmare",
    user_id: "u3",
    created_at: "2025-01-14T13:15:00Z",
    author: "priya_travels",
  },
  {
    id: 4,
    post_id: 1,
    parent_comment_id: null,
    content:
      "the snacks comment YES\n\nevery parent we met had snacks in like 3 different pockets\nit's not a vibe it's infrastructure atp",
    user_id: "u4",
    created_at: "2025-01-14T14:00:00Z",
    author: "lou_family",
  },
  {
    id: 5,
    post_id: 1,
    parent_comment_id: 4,
    content:
      "we have a designated snack bag now\nit lives in the carry on permanently\nnever emptying it again 💀",
    user_id: "u5",
    created_at: "2025-01-14T14:45:00Z",
    author: "tae_adventures",
  },
  // Post 2
  {
    id: 6,
    post_id: 2,
    parent_comment_id: null,
    content:
      "once you realize the starter is a living thing that depends on you... that's the whole game\nstopped murdering mine every 2 weeks fr",
    user_id: "u6",
    created_at: "2025-01-18T15:00:00Z",
    author: "aleksei_bakes",
  },
  {
    id: 7,
    post_id: 2,
    parent_comment_id: 6,
    content:
      "hydration percentage rn\n\nmy crumb is still tight and idk if it's the flour or the fermentation or me",
    user_id: "u1",
    created_at: "2025-01-18T15:30:00Z",
    author: "mara_k",
  },
  {
    id: 8,
    post_id: 2,
    parent_comment_id: null,
    content:
      "friday night mix saturday morning bake is literally my routine now\nhaving the bake as weekend anchor... didn't expect to love it this much ngl",
    user_id: "u3",
    created_at: "2025-01-18T16:00:00Z",
    author: "priya_travels",
  },
  // Post 3
  {
    id: 9,
    post_id: 3,
    parent_comment_id: null,
    content:
      "the rolly polly naturalist detail 😭\n\nkids always find a project when left alone\nwe just need to get out of the way",
    user_id: "u4",
    created_at: "2025-01-22T10:00:00Z",
    author: "lou_family",
  },
  {
    id: 10,
    post_id: 3,
    parent_comment_id: null,
    content:
      "the sibling shift when screens go away is REAL\n\nmy kids still fight but they actually play together now\nkinda slaps tbh",
    user_id: "u5",
    created_at: "2025-01-22T11:30:00Z",
    author: "tae_adventures",
  },
  // Post 6
  {
    id: 11,
    post_id: 6,
    parent_comment_id: null,
    content:
      "the video call with your mom folding with you... got me in my feels\n\nthat's the actual recipe bestie",
    user_id: "u2",
    created_at: "2025-02-05T17:00:00Z",
    author: "travel_jonas",
  },
  {
    id: 12,
    post_id: 6,
    parent_comment_id: 11,
    content:
      "misshapen dumpling tastes the same\n\ngoing on my kitchen wall fr",
    user_id: "u6",
    created_at: "2025-02-05T17:30:00Z",
    author: "aleksei_bakes",
  },
];

export const comments: Comment[] = [...data, ...data];

export const getPostById = (id: number): Post | undefined =>
  posts.find((p) => p.id === id);

export const getCommentsByPostId = (postId: number): Comment[] =>
  comments.filter((c) => c.post_id === postId);

export const getCommunityById = (id: number): Community | undefined =>
  communities.find((c) => c.id === id);

export const getPostsByCommunityId = (communityId: number): Post[] =>
  posts.filter((p) => p.community_id === communityId);

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
      "A space for parents, grandparents, and caregivers to share stories, ask questions, and celebrate the everyday chaos of family life.",
    created_at: "2024-11-01T09:00:00Z",
  },
  {
    id: 2,
    name: "Travel & Adventures",
    description:
      "From weekend road trips to months abroad — share itineraries, hidden gems, and the stories that only happen when you leave home.",
    created_at: "2024-11-03T10:30:00Z",
  },
  {
    id: 3,
    name: "Food & Cooking",
    description:
      "Recipes, restaurant finds, kitchen failures, and the meals that made someone feel at home. All cuisines, all skill levels.",
    created_at: "2024-11-08T08:00:00Z",
  },
  {
    id: 4,
    name: "Hobbies & Creative Life",
    description:
      "Gardening, painting, knitting, woodworking, photography — share what you make and the joy of making it.",
    created_at: "2024-11-12T14:00:00Z",
  },
  {
    id: 5,
    name: "Wellness & Personal Growth",
    description:
      "Honest conversations about rest, habits, mental health, and becoming the person you actually want to be.",
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

  const verbs = [
    "tried",
    "started",
    "found",
    "accidentally got into",
    "was influenced to try",
    "randomly decided to do",
  ];

  const emotions = [
    "obsessed",
    "confused",
    "lowkey addicted",
    "not okay",
    "surprisingly into it",
    "questioning my life",
  ];

  const reactions = [
    "this changed everything",
    "idk how to feel",
    "10/10 would do again",
    "never again actually",
    "why is this so fun",
    "this was a mistake",
  ];

  const questions = [
    "anyone else??",
    "be honest",
    "is it just me",
    "what is happening",
    "why are we like this",
  ];

  const contentBlocks = [
    (t: string) =>
      `saw something about ${t}.\n${verbs[Math.floor(Math.random() * verbs.length)]} it.\n\nnow i'm ${emotions[Math.floor(Math.random() * emotions.length)]}.`,

    (t: string) =>
      `me: i'll try ${t} once\nalso me: does it 5 times\n\n${reactions[Math.floor(Math.random() * reactions.length)]}`,

    (t: string) =>
      `${t} era started as a joke.\nnow it's serious.\n\n${questions[Math.floor(Math.random() * questions.length)]}`,

    (t: string) =>
      `not me getting into ${t} at 2am.\n\nsleep schedule ruined but worth it.`,

    (t: string) => `thought ${t} would be mid.\n\nwas wrong.\nvery wrong.`,

    (t: string) =>
      `${t} looked easy online.\nit was not easy.\n\nstill kinda fun tho.`,

    (t: string) => `why does ${t} feel like a personality trait now.`,

    (t: string) => `spent way too much time on ${t} today.\n\nno regrets.`,

    (t: string) =>
      `${t} + late night = bad decisions\n\nbut also good memories.`,

    (t: string) => `i blinked and now i'm into ${t}.\n\nthis is my life now.`,
  ];

  const titlePatterns = [
    (t: string) =>
      `Got Into ${t} and Now I'm ${emotions[Math.floor(Math.random() * emotions.length)]}`,
    (t: string) => `${t} Was Not Supposed To Be This Fun`,
    (t: string) => `Why Is Everyone Doing ${t} Right Now`,
    (t: string) => `I Tried ${t} So You Don’t Have To`,
    (t: string) => `This ${t} Thing Got Out of Hand`,
    (t: string) => `${t} at 2AM Was a Mistake`,
    (t: string) => `My ${t} Phase Is Getting Serious`,
    (t: string) => `Not Me Becoming a ${t} Person`,
    (t: string) => `${t} Was Supposed To Be a One-Time Thing`,
    (t: string) => `${t} Lowkey Changed My Week`,
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
      "The Sintra meltdown could have been written by me. We had the exact same experience — stunning place, zero memory of actually seeing it because we were in crisis management the whole time.",
    user_id: "u1",
    created_at: "2025-01-14T11:30:00Z",
    author: "mara_k",
  },
  {
    id: 2,
    post_id: 1,
    parent_comment_id: 1,
    content:
      "Coming back the next day solo was the right call. That's the move nobody tells you about.",
    user_id: "u2",
    created_at: "2025-01-14T12:00:00Z",
    author: "travel_jonas",
  },
  {
    id: 3,
    post_id: 1,
    parent_comment_id: 1,
    content:
      "What stroller did you use? We're planning a similar trip and gate-checking has been a nightmare for us.",
    user_id: "u3",
    created_at: "2025-01-14T13:15:00Z",
    author: "priya_travels",
  },
  {
    id: 4,
    post_id: 1,
    parent_comment_id: null,
    content:
      "The snacks comment — yes. Every experienced parent we met had snacks in three separate pockets. It's infrastructure, not an afterthought.",
    user_id: "u4",
    created_at: "2025-01-14T14:00:00Z",
    author: "lou_family",
  },
  {
    id: 5,
    post_id: 1,
    parent_comment_id: 4,
    content:
      "We now pack a dedicated snack bag that lives in the carry-on and is never, ever emptied.",
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
      "Treating the starter like a living thing you're responsible for — that's the shift. Once that clicked I stopped killing mine every two weeks.",
    user_id: "u6",
    created_at: "2025-01-18T15:00:00Z",
    author: "aleksei_bakes",
  },
  {
    id: 7,
    post_id: 2,
    parent_comment_id: 6,
    content:
      "What hydration percentage are you working with? My crumb is still too tight and I can't figure out if it's the flour or the fermentation.",
    user_id: "u1",
    created_at: "2025-01-18T15:30:00Z",
    author: "mara_k",
  },
  {
    id: 8,
    post_id: 2,
    parent_comment_id: null,
    content:
      "The Friday evening mix, Saturday morning shape routine is exactly mine. Having the bake as the anchor of the weekend morning is something I didn't anticipate loving so much.",
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
      "The rolly polly naturalist detail made me laugh and also feel something. Kids left to their own devices always find a project. We just have to get out of the way.",
    user_id: "u4",
    created_at: "2025-01-22T10:00:00Z",
    author: "lou_family",
  },
  {
    id: 10,
    post_id: 3,
    parent_comment_id: null,
    content:
      "Something about the sibling dynamic shifting when screens go away is real. My kids still argue, but they also play together now in a way they didn't before.",
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
      "The video call with your mother folding alongside you — I'm a little teary. That's the real recipe.",
    user_id: "u2",
    created_at: "2025-02-05T17:00:00Z",
    author: "travel_jonas",
  },
  {
    id: 12,
    post_id: 6,
    parent_comment_id: 11,
    content:
      "A misshapen dumpling tastes exactly the same is going on my kitchen wall.",
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

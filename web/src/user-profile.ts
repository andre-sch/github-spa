interface UserProfile {
  id: number;
  name: string | null;
  username: string;
  biography: string | null;
  avatar_url: string;
  followers: number;
  following: number;
  company: string | null;
  location: string | null;
  email: string | null;
  website: string | null;
  repositories: Repository[];
}

interface Repository {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
}

export type { UserProfile, Repository };

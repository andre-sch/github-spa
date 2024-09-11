interface UserProfile {
  id: number;
  name: string;
  username: string;
  biography: string;
  avatar_url: string;
  followers: number;
  following: number;
  company: string;
  location: string;
  email: string;
  website: string;
  repositories: Repository[];
}

interface Repository {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
}

export type { UserProfile, Repository };

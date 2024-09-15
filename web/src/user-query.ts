interface ProfileQueryResult {
  name: string;
  username: string;
  biography: string;
  location: string;
  avatar_url: string;
  repositories: number;
  followers: number;
}

export type { ProfileQueryResult };

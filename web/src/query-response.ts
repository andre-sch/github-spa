interface ProfileQueryResponse {
  current_page: number;
  number_of_pages: number;
  number_of_results: number;
  results: ProfileQueryResult[];
}

interface ProfileQueryResult {
  name: string | null;
  username: string;
  biography: string | null;
  location: string | null;
  avatar_url: string;
  repositories: number;
  followers: number;
}

export type { ProfileQueryResponse, ProfileQueryResult };

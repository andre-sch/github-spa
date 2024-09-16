interface ProfileQueryResponse {
  current_page: number;
  number_of_pages: number;
  number_of_results: number;
  results: ProfileQueryResult[];
}

interface ProfileQueryResult {
  name: string;
  username: string;
  biography: string;
  location: string;
  avatar_url: string;
  repositories: number;
  followers: number;
}

export type { ProfileQueryResponse, ProfileQueryResult };

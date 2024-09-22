import axios from "axios";
import { UserProfile } from "./user-profile";
import { ProfileQueryResponse } from "./query-response";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

async function getUserProfile(username: string): Promise<UserProfile | null> {
  return fetch<UserProfile>(`/profiles/${username}`);
}

async function getProfileQueryResponse(query: string, page?: number): Promise<ProfileQueryResponse | null> {
  var route = `/profiles/search?q=${query}`;
  if (page) route += `&page=${page}`;

  return fetch<ProfileQueryResponse>(route);
}

async function getProfileReadme(username: string): Promise<string | null> {
  return fetch<string>(profileReadmeHost(username) + "README.md");
}

function profileReadmeHost(username: string) {
  return contentHost(username, username);
}

function contentHost(username: string, repo: string) {
  return `https://raw.githubusercontent.com/${username}/${repo}/master/`;
}

async function fetch<T>(route: string): Promise<T | null> {
  try {
    var response = await api.get<T>(route);
    return response.data;
  } catch(e) {
    return null;
  }
}

export {
  getUserProfile,
  getProfileQueryResponse,
  getProfileReadme,
  profileReadmeHost
};

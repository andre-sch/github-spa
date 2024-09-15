import axios from "axios";
import { UserProfile } from "./user-profile";
import { ProfileQueryResult } from "./user-query";

const api = axios.create({
  baseURL: "http://localhost:8080"
});

async function getUserProfile(username: string): Promise<UserProfile | null> {
  return fetch<UserProfile>(`/profiles/${username}`);
}

async function getProfileQueryResults(query: string): Promise<ProfileQueryResult[]> {
  var response = fetch<ProfileQueryResult[]>(`/profiles/search?q=${query}`);
  return response.then((result) => result == null ? [] : result);
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
  getProfileQueryResults,
  getProfileReadme,
  profileReadmeHost
};

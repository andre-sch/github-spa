import axios from "axios";
import { UserProfile } from "./user-profile";

const api = axios.create({
  baseURL: "http://localhost:8080"
});

async function getUserProfile(username: string): Promise<UserProfile> {
  var response = await api.get<UserProfile>(`/profiles/${username}`);
  return response.data;
}

async function getProfileReadme(username: string): Promise<string | null> {
  var response = await axios.get<string>(profileReadmeHost(username) + "README.md");
  if(response.status == 200) return response.data;
  else return null;
}

function contentHost(username: string, repo: string) {
  return `https://raw.githubusercontent.com/${username}/${repo}/master/`;
}

function profileReadmeHost(username: string) {
  return contentHost(username, username);
}

export { getUserProfile, getProfileReadme, profileReadmeHost };

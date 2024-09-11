import axios from "axios";
import { UserProfile } from "./user-profile";

const api = axios.create({
  baseURL: "http://localhost:8080"
});

async function getUserProfile(username: string): Promise<UserProfile> {
  var response = await api.get<UserProfile>(`/profiles/${username}`);
  return response.data;
}

export { getUserProfile };

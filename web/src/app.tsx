import { useEffect, useState } from "react";
import { Header } from "./header";
import { LoadingUserProfile } from "./loading";
import { UserProfileNotFound } from "./not-found";
import { UserDetails } from "./user-details";
import { UserReadme } from "./user-readme";
import { UserRepositories } from "./user-repositories";
import { Footer } from "./footer";

import { ProfileSelectionSubscriber } from "./user-selection";
import { getUserProfile } from "./api";
import type { UserProfile } from "./user-profile";

import "./styles/app.css"

function App() {
  const [username, setUsername] = useState("andre-sch");
  const [userProfile, setUserProfile] = useState<UserProfile | null | undefined>();

  const profileSelectionSubscriber = new ProfileSelectionSubscriber();
  profileSelectionSubscriber.subscribe((e) => setUsername(e.detail.username))

  useEffect(() => {
    getUserProfile(username)
      .then(setUserProfile);
  }, [username]);

  return (
    <>
      <Header {...userProfile} />
      {isLoading(userProfile) && <LoadingUserProfile />}
      {notFound(userProfile) && <UserProfileNotFound />}
      {userProfile && (
        <main>
          <UserDetails {...userProfile} />
          <section>
            <UserReadme {...userProfile} />
            <UserRepositories {...userProfile} />
          </section>
        </main>
      )}
      <Footer />
    </>
  );

  function isLoading(profile: any) { return profile === undefined; }
  function notFound(profile: any) { return profile === null; }
}

export { App };

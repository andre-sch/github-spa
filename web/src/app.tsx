import { useEffect, useState } from "react";
import { Header } from "./header";
import { UserDetails } from "./user-details";
import { UserReadme } from "./user-readme";
import { UserRepositories } from "./user-repositories";
import { Fallback } from "./fallback";
import { Footer } from "./footer";

import { ProfileSelectionSubscriber } from "./user-selection";
import { getUserProfile } from "./api";
import type { UserProfile } from "./user-profile";

import "./styles/app.css"

function App() {
  const [username, setUsername] = useState("andre-sch");
  const [userProfile, setUserProfile] = useState<UserProfile | null>();

  const profileSelectionSubscriber = new ProfileSelectionSubscriber();
  profileSelectionSubscriber.subscribe((e) => setUsername(e.detail.username))

  useEffect(() => {
    getUserProfile(username)
      .then(setUserProfile);
  }, [username]);

  return (
    <>
      <Header {...userProfile} />
      {userProfile ? (
        <main>
          <UserDetails {...userProfile} />
          <section>
            <UserReadme {...userProfile} />
            <UserRepositories {...userProfile} />
          </section>
        </main>
      ) : userProfile !== undefined ? <Fallback /> : null}
      <Footer />
    </>
  );
}

export { App };

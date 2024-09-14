import { useEffect, useState } from "react";
import { Header } from "./header";
import { UserDetails } from "./user-details";
import { UserReadme } from "./user-readme";
import { UserRepositories } from "./user-repositories";
import { Footer } from "./footer";

import { getUserProfile } from "./api";
import type { UserProfile } from "./user-profile";

import "./styles/app.css"

function App() {
  const [userProfile, setUserProfile] = useState<UserProfile>();

  useEffect(() => {
    getUserProfile("Fernanda-Kipper")
      .then(setUserProfile);
  }, []);

  return (
    <>
      <Header {...userProfile} />
      {userProfile &&
        <main>
          <UserDetails {...userProfile} />
          <section>
            <UserReadme {...userProfile} />
            <UserRepositories {...userProfile} />
          </section>
        </main>
      }
      <Footer />
    </>
  );
}

export { App };

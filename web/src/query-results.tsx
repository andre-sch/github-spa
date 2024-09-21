import { PeopleIcon, RepoIcon } from "@primer/octicons-react";
import { Conditional } from "./conditional";

import { ProfileSelectionPublisher } from "./user-selection";
import type { ProfileQueryResult } from "./query-response";

import "./styles/query-results.css"

function QueryResults(props: { results: ProfileQueryResult[] }) {
  return (
    <ul className="query-results">
      {props.results.map(profile => (
        <li key={profile.username}>
          <button onClick={() => select(profile.username)}>
            <img src={profile.avatar_url} alt="avatar" />
            <div>
              <header>
                {profile.name && <h1>{profile.name}</h1>}
                <h2>{profile.username}</h2>
              </header>
              {profile.biography && <p>{profile.biography}</p>}
              <footer>
                <Conditional on={profile.location}>
                  {profile.location}
                </Conditional>

                <Conditional on={profile.repositories}>
                  <Conditional on={profile.location} children={<span>·</span>} />
                  <RepoIcon />
                  {profile.repositories}
                </Conditional>

                <Conditional on={profile.followers}>
                  <Conditional on={profile.location || profile.repositories} children={<span>·</span>} />
                  <PeopleIcon />
                  {profile.followers}
                </Conditional>
              </footer>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );

  function select(username: string) {
    const profileSelectionPublisher = new ProfileSelectionPublisher();
    profileSelectionPublisher.publish(username);
  }
}

export { QueryResults };

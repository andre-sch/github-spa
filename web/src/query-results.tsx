import { useEffect, useState } from "react";
import { PeopleIcon, RepoIcon } from "@primer/octicons-react";
import { Conditional } from "./conditional";

import { ProfileSelectionPublisher } from "./user-selection";
import { getProfileQueryResults } from "./api";
import type { ProfileQueryResponse } from "./user-query";

import "./styles/query-results.css"

function QueryResults(props: { query: string }) {
  const [queryResponse, setQueryResponse] = useState<ProfileQueryResponse | null>(null);

  useEffect(() => {
    if (!props.query) return;

    var timeoutId = setTimeout(() => {
      getProfileQueryResults(props.query)
        .then(setQueryResponse);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [props.query]);

  return (
    <ul className="query-results">
      {queryResponse && queryResponse.results.map(profile => (
        <li key={profile.username}>
          <button onClick={() => select(profile.username)}>
            <img src={profile.avatar_url} alt="avatar" />
            <div>
              <header>
                <h1>{profile.name}</h1>
                <h2>{profile.username}</h2>
              </header>
              <p>{profile.biography}</p>
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

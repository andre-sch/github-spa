import { PeopleIcon, RepoIcon } from "@primer/octicons-react";

import "./styles/query-results.css"

function QueryResults() {
  return (
    <ul className="query-results">
      <li>
        <button>
          <img src="https://avatars.githubusercontent.com/u/77517189?s=80&v=4" alt="avatar" />
          <div>
            <header>
              <h1>André Schlichting</h1>
              <h2>andre-sch</h2>
            </header>
            <p>Computer Science student at UEM. Currently focused on web development.</p>
            <footer>
              Brasil
              <span>·</span>
              <RepoIcon />
              7
              <span>·</span>
              <PeopleIcon />
              9
            </footer>
          </div>
        </button>
      </li>
    </ul>
  );
}

export { QueryResults };

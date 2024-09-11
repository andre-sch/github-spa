import { RepoForkedIcon, RepoIcon, StarIcon } from "@primer/octicons-react";
import type { ReactNode } from "react";

import { formatCount } from "./format";
import type { Repository } from "./user-profile";

import "./styles/user-repositories.css"

function UserRepositories(props: { repositories: Repository[] }) {
  return (
    <ol className="user-repositories">
      {props.repositories.map(repo => (
        <li className="repository-card" key={repo.name}>
          <header>
            <RepoIcon />
            <h1>{repo.name}</h1>
            <span className="visibility">Public</span>
          </header>
          <p>{repo.description}</p>
          <footer>
            <Conditional on={repo.language}>
              <span className="circle"/>
              {repo.language}
            </Conditional>

            <Conditional on={repo.stars}>
              <StarIcon/>
              {formatCount(repo.stars)}
            </Conditional>
            
            <Conditional on={repo.forks}>
              <RepoForkedIcon/>
              {formatCount(repo.forks)}
            </Conditional>
          </footer>
        </li>
      ))}
    </ol>
  );
}

function Conditional(props: { on: any; children: ReactNode }) {
  return Boolean(props.on) && props.children;
}

export { UserRepositories };

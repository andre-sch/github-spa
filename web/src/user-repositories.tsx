import { RepoForkedIcon, RepoIcon, StarIcon } from "@primer/octicons-react";

import "./styles/user-repositories.css"

function UserRepositories() {
  return (
    <ol className="user-repositories">
      <li className="repository-card">
        <header>
          <RepoIcon />
          <h1>epayment</h1>
          <span className="visibility">Public</span>
        </header>
        <p>Gerenciamento de transações financeiras com mensageria.</p>
        <footer>
          <FilledCircleIcon size={12} fill="#9198a1"/>Java
          <StarIcon/>154
          <RepoForkedIcon/>29
        </footer>
      </li>
    </ol>
  );
}

function FilledCircleIcon(props: { size: number; fill: string; }) {
  var center = Math.floor(props.size / 2);
  return (
    <svg height={props.size} width={props.size} xmlns="http://www.w3.org/2000/svg">
      <circle r={center} cx={center} cy={center} fill={props.fill} />
    </svg>
  );
}

export { UserRepositories };

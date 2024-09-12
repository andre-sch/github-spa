import { useEffect, useState } from "react";
import { MarkGithubIcon, SearchIcon } from "@primer/octicons-react";

import "./styles/header.css"

function Header(props: { username?: string }) {
  const standardTitle = "Github clone";
  const [title, setTitle] = useState<string>(standardTitle);

  useEffect(() => {
    setTitle(props.username || standardTitle);
    document.title = title;
  }, [props.username]);

  return (
    <header className="page-header">
      <a
        href="https://github.com/"
        target="_blank"
        children={<MarkGithubIcon size={32}/>}
      />
      <h1>{title}</h1>
      <div>
        <button>
          <SearchIcon />
          <span>Type <kbd>/</kbd> to search</span>
        </button>
      </div>
    </header>
  );
}

export { Header };

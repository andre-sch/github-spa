import { useEffect, useState } from "react";
import { MarkGithubIcon, SearchIcon } from "@primer/octicons-react";

import "./styles/header.css"

function Header(props: { name?: string; username?: string }) {
  const [title, setTitle] = useState<string>(document.title);

  useEffect(() => {
    if (props.username) {
      setTitle(props.username);
      setDocumentTitle();
    }
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

  function setDocumentTitle() {
    document.title = `${props.username} (${props.name})`;
  }
}

export { Header };

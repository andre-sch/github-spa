import { useEffect, useState } from "react";
import { MarkGithubIcon, SearchIcon } from "@primer/octicons-react";
import { Modal } from "./modal";

import "./styles/header.css"

function Header(props: { name?: string; username?: string }) {
  const [title, setTitle] = useState(document.title);
  const [modalEnabled, setModalEnabled] = useState(false);

  useEffect(() => {
    if (props.username) {
      setTitle(props.username);
      setDocumentTitle();
    }
  }, [props.username]);

  const trigger = "/";
  document.addEventListener("keyup", (event) => {
    if (event.key == trigger)
      setModalEnabled(true);
  });

  return (
    <header className="page-header">
      <a
        href="https://github.com/"
        target="_blank"
        children={<MarkGithubIcon size={32}/>}
      />
      <h1>{title}</h1>
      <button onClick={() => setModalEnabled(true)}>
        <SearchIcon />
        <span>Type <kbd>{trigger}</kbd> to search</span>
      </button>
      <div className="delimiter" />

      {modalEnabled && <Modal setModalEnabled={setModalEnabled} />}
    </header>
  );

  function setDocumentTitle() {
    document.title = `${props.username} (${props.name})`;
  }
}

export { Header };

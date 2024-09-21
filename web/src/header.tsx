import { useEffect, useState } from "react";
import { MarkGithubIcon, SearchIcon } from "@primer/octicons-react";
import { Modal } from "./modal";

import "./styles/header.css"

function Header(props: { name?: string | null; username?: string }) {
  const defaultTitle = "Github clone";
  const [title, setTitle] = useState(defaultTitle);
  const [modalEnabled, setModalEnabled] = useState(false);

  useEffect(() => {
    if (props.username) {
      setTitle(props.username);
      document.title = props.username + (props.name ? ` (${props.name})` : "");
    } else document.title = defaultTitle;
  }, [props.username]);

  const activationKey = "/";
  const deactivationKey = "Escape";

  document.addEventListener("keyup", (event) => {
    if (event.key == activationKey) setModalEnabled(true);
    if (event.key == deactivationKey) setModalEnabled(false);
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
        <span>Type <kbd>{activationKey}</kbd> to search</span>
      </button>
      <div className="delimiter" />

      {modalEnabled && <Modal setModalEnabled={setModalEnabled} />}
    </header>
  );
}

export { Header };

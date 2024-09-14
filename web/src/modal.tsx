import { useState } from "react";
import { SearchIcon, XCircleFillIcon } from "@primer/octicons-react";
import { QueryResults } from "./query-results";

import "./styles/modal.css";

function Modal(props: { setModalEnabled: (value: boolean) => void; }) {
  const [profileQuery, setProfileQuery] = useState("");

  return (
    <>
      <div className="modal">
        <div className="input-container">
          <SearchIcon />
          <input
            value={profileQuery}
            onChange={(e) => setProfileQuery(e.target.value)}
            autoFocus
          />
          <button onClick={() => setProfileQuery("")} hidden={profileQuery.length == 0}>
            <XCircleFillIcon />
          </button>
        </div>
        <QueryResults />
      </div>
      <div className="backdrop" onClick={() => props.setModalEnabled(false)}></div>
    </>
  );
}

export { Modal };

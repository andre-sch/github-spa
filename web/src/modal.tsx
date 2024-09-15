import { useState } from "react";
import { SearchIcon, XCircleFillIcon } from "@primer/octicons-react";
import { QueryResults } from "./query-results";

import { ProfileSelectionPublisher, ProfileSelectionSubscriber } from "./user-selection";

import "./styles/modal.css";

function Modal(props: { setModalEnabled: (value: boolean) => void; }) {
  const [profileQuery, setProfileQuery] = useState("");

  const profileSelectionSubscriber = new ProfileSelectionSubscriber();
  profileSelectionSubscriber.subscribe(() => props.setModalEnabled(false));

  return (
    <>
      <div className="modal">
        <div className="input-container">
          <SearchIcon />
          <input
            value={profileQuery}
            onKeyDown={submitInputOnEnter}
            onChange={(e) => setProfileQuery(e.target.value)}
            placeholder="Search user profile"
            autoFocus
          />
          <button onClick={() => setProfileQuery("")} hidden={profileQuery.length == 0}>
            <XCircleFillIcon />
          </button>
        </div>
        <QueryResults query={profileQuery} />
      </div>
      <div className="backdrop" onClick={() => props.setModalEnabled(false)}></div>
    </>
  );

  function submitInputOnEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key == "Enter") {
      const profileSelectionPublisher = new ProfileSelectionPublisher();
      profileSelectionPublisher.publish(profileQuery);
    }
  }
}

export { Modal };

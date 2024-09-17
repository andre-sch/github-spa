import { useState } from "react";
import { SearchIcon, XCircleFillIcon } from "@primer/octicons-react";
import { QueryResponseProvider } from "./query-response-provider";
import { QueryResults } from "./query-results";
import { Pagination } from "./pagination";

import { formatCount } from "./format";
import { ProfileSelectionPublisher, ProfileSelectionSubscriber } from "./user-selection";

import "./styles/modal.css";

function Modal(props: { setModalEnabled: (value: boolean) => void; }) {
  const [profileQuery, setProfileQuery] = useState("");
  const [pageOfQuery, setPageOfQuery] = useState(0);

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
        <QueryResponseProvider
          query={profileQuery}
          page={pageOfQuery}
          children={(queryResponse) => (
            <>
              <h1>{formatCount(queryResponse.number_of_results)} results</h1>
              <QueryResults results={queryResponse.results} />
              {queryResponse.number_of_pages > 1 && (
                <Pagination
                  currentPage={queryResponse.current_page}
                  numberOfPages={queryResponse.number_of_pages}
                  setPage={setPageOfQuery} />
              )}
            </>
          )}
        />
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

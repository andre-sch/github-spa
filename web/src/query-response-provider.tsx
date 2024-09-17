import { ReactNode, useEffect, useState } from "react";
import { ProfileQueryResponse } from "./query-response";
import { getProfileQueryResponse } from "./api";

interface QueryResponseProviderProps {
  query: string;
  page: number;
  children: (response: ProfileQueryResponse) => ReactNode;
}

function QueryResponseProvider(props: QueryResponseProviderProps) {
  const [queryResponse, setQueryResponse] = useState<ProfileQueryResponse | null>(null);

  useEffect(() => {
    if (!props.query) {
      setQueryResponse(null);
      return;
    }

    var typingDelay = 500;
    var timeoutId = setTimeout(() => {
      getProfileQueryResponse(props.query)
        .then(setQueryResponse);
    }, typingDelay);

    return () => clearTimeout(timeoutId);
  }, [props.query]);

  useEffect(() => {
    if (!props.query) {
      setQueryResponse(null);
      return;
    }

    getProfileQueryResponse(props.query, props.page)
      .then(setQueryResponse);
  }, [props.page]);

  return queryResponse && props.children(queryResponse);
}

export { QueryResponseProvider };

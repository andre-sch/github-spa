package com.github_clone.api;

import java.util.*;
import java.util.concurrent.*;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserProfileAggregator {
  private final String baseURL = "https://api.github.com";
  private final ExternalAPI externalAPI = new ExternalAPI(baseURL);

  @CrossOrigin
  @GetMapping("/profiles/{username}")
  public RequiredUserProfile execute(@PathVariable String username)
    throws InterruptedException, ExecutionException
  {
    var promiseOfUserDetails = externalAPI.get("/users/" + username, ProvidedUserDetails.class);
    var promiseOfRepositories = externalAPI.get("/users/" + username + "/repos", ProvidedRepository[].class);

    var promiseOfBoth = CompletableFuture.allOf(promiseOfUserDetails, promiseOfRepositories);
    promiseOfBoth.join();

    var providedUserDetails = promiseOfUserDetails.get();
    var providedRepositories = promiseOfRepositories.get();

    var adapter = new UserProfileAdapter();
    return adapter.adapt(providedUserDetails, providedRepositories);
  }

  @CrossOrigin
  @GetMapping("/profiles/search")
  public RequiredQueryResponse search(
    @RequestParam("q") String query,
    @RequestParam(name="page", defaultValue="0") int currentPage
  ) {
    int resultsPerPage = 5;
    var providedQueryResponse = externalAPI.get(
      "/search/users?q=" + query + "&per_page=" + resultsPerPage + "&page=" + currentPage,
      ProvidedQueryResponse.class
    ).join();
    
    var accessKeys = providedQueryResponse.items();
    var requiredQueryResults = fetchQueryResultsBy(accessKeys);

    int numberOfResults = providedQueryResponse.total_count();
    int numberOfPages = (int) Math.ceil((double) numberOfResults / resultsPerPage);
    return new RequiredQueryResponse(currentPage, numberOfPages, numberOfResults, requiredQueryResults);
  }

  public RequiredQueryResult[] fetchQueryResultsBy(AccessKey[] accessKeys) {
    var requiredQueryResults = new RequiredQueryResult[accessKeys.length];
    var promises = new CompletableFuture[accessKeys.length];

    var adapter = new QueryResultAdapter();
    var iterator = Arrays.asList(accessKeys).listIterator();

    while (iterator.hasNext()) {
      int i = iterator.nextIndex();
      var accessKey = iterator.next();
      String username = accessKey.login();
      
      promises[i] = externalAPI
        .get("/users/" + username, ProvidedQueryResult.class)
        .thenApply(adapter::adapt)
        .thenAccept((result) -> requiredQueryResults[i] = result);
    }

    var promiseOfAll = CompletableFuture.allOf(promises);
    promiseOfAll.join();

    return requiredQueryResults;
  }
}

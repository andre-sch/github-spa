package com.github_clone.api;

import java.util.Arrays;
import java.util.concurrent.CompletableFuture;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserProfileSearch {
  private final GithubAPI githubAPI;

  public UserProfileSearch(GithubAPI githubAPI) {
    this.githubAPI = githubAPI;
  }

  @CrossOrigin
  @GetMapping("/profiles/search")
  public RequiredQueryResponse execute(
    @RequestParam("q") String query,
    @RequestParam(name="page", defaultValue="0") int currentPage
  ) {
    final int resultsPerPage = 5;
    String encodedQuery = URLEncoder.encode(query, StandardCharsets.UTF_8);
    var providedQueryResponse = githubAPI.get(
      ProvidedQueryResponse.class,
      "/search/users?q=" + encodedQuery + "&per_page=" + resultsPerPage + "&page=" + currentPage
    ).join();
    
    var accessKeys = providedQueryResponse.items();
    var requiredQueryResults = fetchQueryResultsBy(accessKeys);

    int numberOfResults = providedQueryResponse.total_count();
    int numberOfPages = Math.min(100, (int) Math.ceil((double) numberOfResults / resultsPerPage));
    return new RequiredQueryResponse(currentPage, numberOfPages, numberOfResults, requiredQueryResults);
  }

  private RequiredQueryResult[] fetchQueryResultsBy(AccessKey[] accessKeys) {
    var requiredQueryResults = new RequiredQueryResult[accessKeys.length];
    var promises = new CompletableFuture[accessKeys.length];

    var adapter = new QueryResultAdapter();
    var iterator = Arrays.asList(accessKeys).listIterator();

    while (iterator.hasNext()) {
      int i = iterator.nextIndex();
      var accessKey = iterator.next();
      String username = accessKey.login();
      
      promises[i] = githubAPI
        .get(ProvidedQueryResult.class, "/users/" + username)
        .thenApply(adapter::adapt)
        .thenAccept((result) -> requiredQueryResults[i] = result);
    }

    var promiseOfAll = CompletableFuture.allOf(promises);
    promiseOfAll.join();

    return requiredQueryResults;
  }
}

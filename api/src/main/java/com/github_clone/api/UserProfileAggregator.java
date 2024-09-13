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
  public RequiredQueryResult[] search(@RequestParam("q") String query) {
    var accessKeyQuery = externalAPI.get("/search/users?q=" + query, AccessKeyQuery.class).join();
    var accessKeys = accessKeyQuery.items();

    var requiredQueryResult = new RequiredQueryResult[accessKeys.length];
    var promises = new LinkedList<CompletableFuture<Void>>();

    var iterator = Arrays.asList(accessKeys).listIterator();
    while (iterator.hasNext()) {
      int i = iterator.nextIndex();
      var accessKey = iterator.next();
      
      String username = accessKey.login();
      var promise = externalAPI
        .get("/users/" + username, ProvidedQueryResult.class)
        .thenAccept((providedQueryResult) -> {
          var adapter = new QueryResultAdapter();
          requiredQueryResult[i] = adapter.adapt(providedQueryResult);
        });

      promises.add(promise);
    }

    var promiseOfAll = CompletableFuture.allOf(promises.toArray(CompletableFuture[]::new));
    promiseOfAll.join();

    return requiredQueryResult;
  }
}

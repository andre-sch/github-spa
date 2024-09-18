package com.github_clone.api;

import java.util.concurrent.*;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserProfileAggregation {
  private final ExternalAPI externalAPI = new ExternalAPI("https://api.github.com");

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
}

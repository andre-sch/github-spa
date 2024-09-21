package com.github_clone.api;

import java.util.concurrent.*;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserProfileAggregation {
  private final GithubAPI githubAPI;

  public UserProfileAggregation(GithubAPI githubAPI) {
    this.githubAPI = githubAPI;
  }

  @CrossOrigin
  @GetMapping("/profiles/{username}")
  public RequiredUserProfile execute(@PathVariable String username)
    throws InterruptedException, ExecutionException
  {
    var promiseOfUserDetails = githubAPI.get(ProvidedUserDetails.class, "/users/" + username);
    var promiseOfRepositories = githubAPI.get(ProvidedRepository[].class, "/users/" + username + "/repos");

    var promiseOfBoth = CompletableFuture.allOf(promiseOfUserDetails, promiseOfRepositories);
    promiseOfBoth.join();

    var providedUserDetails = promiseOfUserDetails.get();
    var providedRepositories = promiseOfRepositories.get();

    var adapter = new UserProfileAdapter();
    return adapter.adapt(providedUserDetails, providedRepositories);
  }
}

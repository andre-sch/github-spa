package com.github_clone.api;

import java.util.Arrays;

public class UserProfileAdapter {
  public RequiredUserProfile adapt(
    ProvidedUserDetails userDetails,
    ProvidedRepository[] repositories
  ) {
    return new RequiredUserProfile(
      userDetails.id(),
      userDetails.name(),
      userDetails.login(),
      userDetails.bio(),
      userDetails.avatar_url(),
      userDetails.followers(),
      userDetails.following(),
      userDetails.company(),
      userDetails.location(),
      userDetails.email(),
      userDetails.website(),
      Arrays
        .stream(repositories)
        .map((repository) ->
          new RequiredRepository(
            repository.name(),
            repository.description(),
            repository.language(),
            repository.stargazers_count(),
            repository.forks()
          )
        )
        .toList()
    );
  }
}

package com.github_clone.api;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ProvidedQueryResult(
  String name,
  String login,
  String bio,
  String location,
  String avatar_url,
  int public_repos,
  int followers
) {}

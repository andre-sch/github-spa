package com.github_clone.api;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ProvidedRepository(
  String name,
  String description,
  String language,
  int stargazers_count,
  int forks
) {}

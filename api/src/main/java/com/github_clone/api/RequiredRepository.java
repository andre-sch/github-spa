package com.github_clone.api;

public record RequiredRepository(
  String name,
  String description,
  String language,
  int stars,
  int forks
) {}

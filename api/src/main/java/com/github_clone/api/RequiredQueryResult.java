package com.github_clone.api;

public record RequiredQueryResult(
  String name,
  String username,
  String biography,
  String location,
  String avatar_url,
  int repositories,
  int followers
) {}

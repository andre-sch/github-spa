package com.github_clone.api;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ProvidedUserDetails(
  int id,
  String name,
  String login,
  String bio,
  String avatar_url,
  int followers,
  int following,
  String company,
  String location,
  String email,
  String website
) {}

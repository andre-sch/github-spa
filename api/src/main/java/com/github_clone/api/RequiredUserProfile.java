package com.github_clone.api;

import java.util.List;

public record RequiredUserProfile(
  int id,
  String name,
  String username,
  String biography,
  String avatar_url,
  int followers,
  int following,
  String company,
  String location,
  String email,
  String website,
  List<RequiredRepository> repositories
) {}

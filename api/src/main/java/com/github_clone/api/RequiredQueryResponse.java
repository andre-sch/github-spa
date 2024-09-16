package com.github_clone.api;

public record RequiredQueryResponse(
  int current_page,
  int number_of_pages,
  int number_of_results,
  RequiredQueryResult[] results
) {}

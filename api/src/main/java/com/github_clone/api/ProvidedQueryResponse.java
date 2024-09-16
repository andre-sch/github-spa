package com.github_clone.api;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ProvidedQueryResponse(int total_count, AccessKey[] items) {}

@JsonIgnoreProperties(ignoreUnknown = true)
record AccessKey(String login) {}

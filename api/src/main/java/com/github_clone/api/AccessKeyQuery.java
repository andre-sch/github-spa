package com.github_clone.api;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record AccessKeyQuery(AccessKey[] items) {}

@JsonIgnoreProperties(ignoreUnknown = true)
record AccessKey(String login) {}

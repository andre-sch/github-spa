package com.github_clone.api;

public class QueryResultAdapter {
  public RequiredQueryResult adapt(
    ProvidedQueryResult providedQueryResult
  ) {
    return new RequiredQueryResult(
      providedQueryResult.name(),
      providedQueryResult.login(),
      providedQueryResult.bio(),
      providedQueryResult.location(),
      providedQueryResult.avatar_url(),
      providedQueryResult.public_repos(),
      providedQueryResult.followers()
    );
  }
}

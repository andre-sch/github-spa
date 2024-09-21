package com.github_clone.api;

import java.util.Map;
import java.util.HashMap;
import java.util.concurrent.CompletableFuture;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

@Service
public class GithubAPI {
  private final String installationId;
  private final Authentication authentication;
  
  public GithubAPI(Authentication authentication, Environment environment) {
    this.authentication = authentication;
    this.installationId = environment.getProperty("github.installation_id");
  }

  private final HttpClient client = new HttpClient("https://api.github.com");

  public <T> CompletableFuture<T> get(Class<T> responseType, String route) {
    Map<String, String> headers = new HashMap<>();
    headers.put("Authorization", "Bearer " + getInstallationToken());
    return client.get(responseType, route, headers);
  }

  private String getInstallationToken() {
    String applicationToken = authentication.getToken();
    return exchangeTokens(applicationToken);
  }

  private String exchangeTokens(String applicationToken) {
    Map<String, String> headers = new HashMap<>();
    headers.put("Authorization", "Bearer " + applicationToken);

    var response = client.post(TokenExchange.class, "/app/installations/" + installationId + "/access_tokens", headers);
    String installationToken = response.join().token();

    return installationToken;
  }
}

@JsonIgnoreProperties(ignoreUnknown = true)
record TokenExchange(String token /*, Instant expires_at*/) {}

package com.github_clone.api;

import java.time.*;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

// NOTE: The GitHub API has 2-step authentication. First, a token for the application
// (GitHub App) is generated, and then it is exchanged for an installation token

@Service
public class GithubAPI {
  private final String installationId;
  private final Authentication authentication;

  private String installationToken;
  private Date installationTokenExpiration;
  
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
    if (hasInstallationTokenExpired()) {
      String applicationToken = authentication.getToken();
      var exchange = exchangeTokens(applicationToken);
      installationToken = exchange.token();
      installationTokenExpiration = exchange.expires_at();
    }

    return installationToken;
  }

  private boolean hasInstallationTokenExpired() {
    var latency = Duration.ofMinutes(5);
    var threshold = Date.from(Instant.now().plus(latency));
    return installationToken == null || installationTokenExpiration.before(threshold);
  }

  private TokenExchange exchangeTokens(String applicationToken) {
    Map<String, String> headers = new HashMap<>();
    headers.put("Authorization", "Bearer " + applicationToken);

    String route = "/app/installations/" + installationId + "/access_tokens";
    return client.post(TokenExchange.class, route, headers).join();
  }
}

@JsonIgnoreProperties(ignoreUnknown = true)
record TokenExchange(String token, Date expires_at) {}

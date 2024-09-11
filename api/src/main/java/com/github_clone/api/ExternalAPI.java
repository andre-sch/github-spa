package com.github_clone.api;

import java.net.URI;
import java.net.http.*;
import java.util.concurrent.CompletableFuture;

public class ExternalAPI {
  private final String baseURL;
  private final HttpClient client = HttpClient.newHttpClient();
  private final JsonConverter json = new JsonConverter();

  public ExternalAPI(String baseURL) {
    this.baseURL = baseURL;
  }

  public <T> CompletableFuture<T> get(String route, Class<T> responseType) {
    var request = HttpRequest
      .newBuilder()
      .GET()
      .uri(URI.create(baseURL + route))
      .build();
    
    var promise = client.sendAsync(request, HttpResponse.BodyHandlers.ofString());
    return promise.thenApply((response) -> json.deserialize(response.body(), responseType));
  }
}

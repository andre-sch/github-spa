package com.github_clone.api;

import java.util.*;
import java.net.*;
import java.net.http.*;
import java.net.http.HttpRequest.BodyPublishers;
import java.util.concurrent.CompletableFuture;

public class HttpClient {
  private final java.net.http.HttpClient http = java.net.http.HttpClient.newHttpClient();
  private final JsonConverter json = new JsonConverter();
  private final String baseURL;

  public HttpClient(String baseURL) {
    this.baseURL = baseURL;
  }

  public <T> CompletableFuture<T> get(Class<T> responseType, String route) {
    Map<String, String> noHeaders = new HashMap<>();
    return get(responseType, route, noHeaders);
  }

  public <T> CompletableFuture<T> get(Class<T> responseType, String route, Map<String, String> headers) {
    var request = HttpRequest
      .newBuilder()
      .uri(absolutePathOf(route))
      .GET()
      .headers(arrayOf(headers))
      .build();

    return send(request, responseType);
  }

  public <T> CompletableFuture<T> post(Class<T> responseType, String route) {
    Object noBody = null;
    Map<String, String> noHeaders = new HashMap<>();
    return post(responseType, route, noBody, noHeaders);
  }

  public <T> CompletableFuture<T> post(Class<T> responseType, String route, Map<String, String> headers) {
    Object noBody = null;
    return post(responseType, route, noBody, headers);
  }

  public <T> CompletableFuture<T> post(Class<T> responseType, String route, Object body) {
    Map<String, String> noHeaders = new HashMap<>();
    return post(responseType, route, body, noHeaders);
  }

  public <T> CompletableFuture<T> post(
    Class<T> responseType,
    String route,
    Object body,
    Map<String, String> headers
  ) {
    var request = HttpRequest
      .newBuilder()
      .uri(absolutePathOf(route))
      .POST(BodyPublishers.ofString(json.serialize(body)))
      .headers(arrayOf(headers))
      .build();

    return send(request, responseType);
  }

  private <T> CompletableFuture<T> send(HttpRequest request, Class<T> responseType) {
    return http.sendAsync(request, HttpResponse.BodyHandlers.ofString())
      .thenApply(response -> json.deserialize(response.body(), responseType));
  }

  private URI absolutePathOf(String relativePath) {
    try { return new URI(baseURL).resolve(relativePath); }
    catch (URISyntaxException e) { throw new RuntimeException(e); }
  }

  private String[] arrayOf(Map<String, String> map) {
    var list = new LinkedList<String>();
    for (var entry : map.entrySet()) {
      list.add(entry.getKey());
      list.add(entry.getValue());
    }

    return list.toArray(String[]::new);
  }
}

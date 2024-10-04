package com.github_clone.api;

public class HttpException extends RuntimeException {
  private int statusCode;

  public HttpException(int statusCode) {
    super();
    this.statusCode = statusCode;
  }

  public int statusCode() {
    return statusCode;
  }
}

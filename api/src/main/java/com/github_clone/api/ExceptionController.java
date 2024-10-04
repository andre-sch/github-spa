package com.github_clone.api;

import java.util.concurrent.CompletionException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.http.ResponseEntity;

@ControllerAdvice
public class ExceptionController {
  @ExceptionHandler(CompletionException.class)
  public ResponseEntity<Void> handleCompletionException(CompletionException exception) throws Throwable {
    Throwable cause = exception.getCause();

    if (cause instanceof HttpException)
      return handleHttpException((HttpException) cause);
    else return handleGenericException(exception);
  }

  @ExceptionHandler(HttpException.class)
  public ResponseEntity<Void> handleHttpException(HttpException exception) {
    return ResponseEntity.status(exception.statusCode()).build();
  }
  
  @ExceptionHandler({ Exception.class, RuntimeException.class })
  public ResponseEntity<Void> handleGenericException(Exception exception) {
    exception.printStackTrace();
    return ResponseEntity.status(500).build();
  }
}

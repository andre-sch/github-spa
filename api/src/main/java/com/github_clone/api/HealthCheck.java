package com.github_clone.api;

import java.time.Instant;
import org.springframework.web.bind.annotation.*;

@RestController
public class HealthCheck {
  @CrossOrigin
  @GetMapping("/")
  public ServerStatus getStatus() {
    return new ServerStatus();
  }
}

class ServerStatus {
  public String message = "Server is running.";
  public Instant timestamp = Instant.now();
}

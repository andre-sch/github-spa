package com.github_clone.api;

import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonConverter {
  private final ObjectMapper json = new ObjectMapper();

  public String serialize(Object input) {
    try { return json.writeValueAsString(input); }
    catch (Exception e) { throw new RuntimeException(e); }
  }

  public <T> T deserialize(String input, Class<T> clazz) {
    try { return json.readValue(input, clazz); }
    catch (Exception e) { throw new RuntimeException(e); }
  }
}

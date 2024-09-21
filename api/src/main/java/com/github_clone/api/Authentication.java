package com.github_clone.api;

import java.util.*;
import java.time.Instant;
import java.security.*;
import java.security.interfaces.*;
import java.security.spec.*;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

@Service
public class Authentication {
  private final String encodedPublicKey;
  private final String encodedPrivateKey;
  private final String issuer;

  public Authentication(Environment environment) {
    this.encodedPublicKey = environment.getProperty("jwt.public_key");
    this.encodedPrivateKey = environment.getProperty("jwt.private_key");
    this.issuer = environment.getProperty("jwt.issuer");
  }

  public String getToken() {
    try {
      var algorithm = Algorithm.RSA256(getPublicKey(), getPrivateKey());

      return JWT
        .create()
        .withIssuer(issuer)
        .withIssuedAt(Instant.now().minusSeconds(60))
        .withExpiresAt(Instant.now().plusSeconds(10 * 60))
        .sign(algorithm);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  private RSAPublicKey getPublicKey() throws Exception {
    byte[] decodedPublicKey = Base64.getDecoder().decode(encodedPublicKey);
    var publicKeySpec = new X509EncodedKeySpec(decodedPublicKey);
    return (RSAPublicKey) KeyFactory.getInstance("RSA").generatePublic(publicKeySpec);
  }

  private RSAPrivateKey getPrivateKey() throws Exception {
    byte[] decodedPrivateKey = Base64.getDecoder().decode(encodedPrivateKey);
    var privateKeySpec = new PKCS8EncodedKeySpec(decodedPrivateKey);
    return (RSAPrivateKey) KeyFactory.getInstance("RSA").generatePrivate(privateKeySpec);
  }
}

package com.gogame;

import com.gogame.rest.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.boot.builder.*;
import org.springframework.web.bind.annotation.*;

@RestController
@EnableAutoConfiguration
public class GoGameApplication {
  public static void main(String[] args) {
    new SpringApplicationBuilder(GoGameApplication.class)
        .sources(GamePlayRestController.class)
        .run(args);
  }
}

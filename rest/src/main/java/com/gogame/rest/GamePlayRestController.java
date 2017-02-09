package com.gogame.rest;

import org.springframework.web.bind.annotation.*;

@RestController
public class GamePlayRestController {

  @RequestMapping("/ping")
  String ping() {
    return "Server up!";
  }

}

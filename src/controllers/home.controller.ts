import { Inject, Service } from "typedi";
import { Controller, Get, Req } from "routing-controllers";
import { Request } from "express";

import { HomeService } from "../services/home.service";

@Service()
@Controller("/")
export class HomeController {
  @Inject()
  private homeService: HomeService;

  @Get("")
  home(@Req() req: Request) {
    return this.homeService.home(req);
  }
}

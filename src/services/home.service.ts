import { Service, Inject } from "typedi";
import { Request } from "express";
import { ClientService } from "./client.service";
import { name, version } from "../../package.json";

@Service()
export class HomeService {
  @Inject()
  private client: ClientService;

  public home(req: Request) {
    return {
      title: name,
      version,
      ip: this.client.ip(req),
    };
  }
}

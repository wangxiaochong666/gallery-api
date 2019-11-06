import { Service } from "typedi";
import { Request } from "express";

@Service()
export class ClientService {
  public ip(req: Request) {
    return (
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection as any).socket.remoteAddress ||
      ""
    );
  }
}

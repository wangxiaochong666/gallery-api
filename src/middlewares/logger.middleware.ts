import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";
import morgan from "morgan";
import { Request, Response } from "express";

@Middleware({ type: "before" })
export class LoggerMiddleware implements ExpressMiddlewareInterface {
  use = morgan("combined", {
    skip(_req: Request, res: Response) {
      return res.statusCode >= 400;
    },
  });
}

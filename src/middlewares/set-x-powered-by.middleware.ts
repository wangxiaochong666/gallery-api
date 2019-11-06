import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";

/**
 * set X-Powered-By
 */
@Middleware({ type: "before" })
export class SetXPoweredByMiddleware implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction): void {
    res.set("X-Powered-By", "tracker-services");
    next();
  }
}

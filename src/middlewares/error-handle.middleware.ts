import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from "routing-controllers";
import * as Express from "express";

@Middleware({ type: "after" })
export class AllErrorsHandler implements ExpressErrorMiddlewareInterface {
  error(error: HttpError, req: Express.Request, res: Express.Response, next: Express.NextFunction) {
    res.status(error.httpCode || 500).send({
      ret: error.httpCode || 500,
      msg: error.message || "",
      date: new Date().toISOString(),
      data: {},
    });
  }
}

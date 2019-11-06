import express, { Application } from "express";
import { useExpressServer } from "routing-controllers";

// Instance 创建实例
const app: Application = express();

app
  .enable("strict routing") // 严格路由
  .disable("x-powered-by"); // 禁用 X-Powered-By

// 应用控制器
useExpressServer(app, {
  routePrefix: "/api",
  cors: true,
  development: true,
  defaultErrorHandler: false,
  controllers: [__dirname + "/controllers/*.controller.{ts,js}"],
  middlewares: [__dirname + "/middlewares/*.middleware.{ts,js}"],
  interceptors: [__dirname + "/interceptors/*.interceptor.{ts,js}"],
});

export default app;

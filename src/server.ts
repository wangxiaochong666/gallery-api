/**
 * Module dependencies.
 */
import "reflect-metadata";
import "./lib/dotenv/register";

import http from "http";
import createDebug from "debug";

import { findAPortNotInUse } from "portscanner";

import { Container } from "typedi";
import { useContainer } from "routing-controllers";

import { name } from "../package.json";

import app from "./app";

import Port from "./utilities/port";

// 应用容器
useContainer(Container);

async function bootstrap() {
  /**
   * Create DEBUG server.
   */
  const debug = createDebug(`${name}:server`);

  /**
   * Get port from environment and store in Express.
   */
  const port = await findAPortNotInUse(Port.normalize(process.env.PORT || "8080") as number);
  app.set("port", port);

  /**
   * Get hostname from environment and store.
   */
  const hostname = process.env.HOST || "0.0.0.0";

  /**
   * Create HTTP server.
   */
  const server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port, hostname);
  server.on("error", onError);
  server.on("listening", onListening);

  /**
   * Event listener for HTTP server "error" event.
   */
  function onError(error) {
    if (error.syscall !== "listen") {
      throw error;
    }

    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */
  function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
  }
}

bootstrap();

// Catch CTRL/CMD+C interrupts cleanly
["SIGHUP", "SIGINT", "SIGQUIT", "SIGABRT", "SIGTERM"].forEach((s: NodeJS.Signals) =>
  process.on(s, () => process.exit(0))
);

import express from "express";
import { Application } from "express";
import logger from "@/ultis/logger";

interface appConstructor {
  forEach: (arg0: (controller: any) => void) => void;
}

class Express {
  public app: Application;
  public port: number;

  constructor(appInit: {
    port: number;
    databases: appConstructor;
    middleWares: appConstructor;
    controllers: appConstructor;
  }) {
    this.app = express();
    this.port = appInit.port;

    this.middlewares(appInit.middleWares);
    this.connectDatabase(appInit.databases);
    this.routes(appInit.controllers);
  }

  private routes(controllers: appConstructor): void {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }
  private middlewares(middleWares: appConstructor): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }
  private connectDatabase(databases: appConstructor): void {
    databases.forEach((database) => {
      database.connect();
    });
  }
  public listen(): void {
    this.app.listen(this.port, () => {
      logger({
        type: "Success",
        message: `Server is listening on http://localhost:${this.port}`
      });
    });
  }
}
export default Express;

import { Controller } from "../controllers";
import { ConcreteController, RouteMethod } from "../defs";
import { Request, Response } from "../io";
import Server from "../io/server";

export default abstract class Route<Rq extends Request, Rs extends Response> {
  protected server: Server<Rq, Rs>;
  public constructor(server: Server<Rq, Rs>) {
    this.server = server;
  }
  protected abstract Controller: ConcreteController<Rq, Rs, Controller<Rq, Rs>>;
  protected abstract route: string;
  protected abstract method: RouteMethod;
  public listen() {
    this.server.handle({
      method: this.method,
      route: this.route,
      Controller: this.Controller,
    });
  }
}

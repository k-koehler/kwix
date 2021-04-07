import { Request, Response } from "../io";
import { Controller } from "../controllers";
import { ConcreteController, RouteMethod } from "../defs";

export default abstract class Server<Rq extends Request, Rs extends Response> {
  public abstract handle({
    method,
    route,
    Controller,
  }: {
    method: RouteMethod;
    route: string;
    Controller: ConcreteController<Rq, Rs, Controller<Rq, Rs>>;
  }): void;
}

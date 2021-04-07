import Controller from "./controllers/controller";
import { Request, Response } from "./io";

export type ConcreteController<
  Rq extends Request,
  Rs extends Response,
  T extends Controller<Rq, Rs> = Controller<Rq, Rs>
> = new (req: Rq, res: Rs) => T;

export enum RouteMethod {
  Get = "get",
  Post = "post",
  Patch = "patch",
  Put = "put",
  Delete = "delete",
}

export type Awaitable<T> = T | Promise<T>;

export enum StatusCode {
  Success = 200,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  FormError = 422,
  Error = 500,
  BadRequest = 400,
}

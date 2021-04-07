import Request from "../io/request";
import Response from "../io/response";
import MiddlewareError from "../middleware-errors/middleware.error";
import { VolatileAsync, VolatileError } from "../utils";

export type ConcreteMiddleware<T> = new (
  req: Request,
  res: Response
) => Middleware<T>;

export default abstract class Middleware<T = void> {
  protected req: Request;
  protected res: Response;

  public constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
  }

  protected async useMiddlewareResult<R>(
    OtherMiddleware: ConcreteMiddleware<R>
  ) {
    const middlewareResult = await new OtherMiddleware(
      this.req,
      this.res
    ).runner.check();
    if (middlewareResult instanceof VolatileError) {
      throw middlewareResult.error;
    }
    return middlewareResult.result;
  }

  public abstract get runner(): VolatileAsync<T, MiddlewareError>;
}

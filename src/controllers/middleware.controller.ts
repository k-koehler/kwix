import Request from "../io/request";
import Response from "../io/response";
import FormError from "../middleware-errors/form.error";
import MiddlewareError from "../middleware-errors/middleware.error";
import { ConcreteMiddleware } from "../middleware/middleware";
import Controller from "./controller";
import Maybe from "../utils/maybe";
import { VolatileError } from "../utils";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "../middleware-errors";
import { Awaitable } from "../defs";

export default abstract class MiddlewareController<
  Rq extends Request,
  Rs extends Response
> extends Controller<Rq, Rs> {
  private middlewares: ConcreteMiddleware<unknown>[];
  private middlewareResults: WeakMap<ConcreteMiddleware<unknown>, any>;

  protected abstract onError?: (error: Error) => Awaitable<unknown>;

  public constructor(req: Rq, res: Rs) {
    super(req, res);
    this.middlewares = [];
    this.middlewareResults = new WeakMap();
  }

  protected use<T>(middleware: ConcreteMiddleware<T>) {
    this.middlewares.push(middleware);
  }

  protected useMiddlewareResult<T>(
    middleware: ConcreteMiddleware<T>
  ): Maybe<T> {
    return new Maybe(this.middlewareResults.get(middleware));
  }
  private handleError(error: Error) {
    this.onError?.(error);
    if (error instanceof MiddlewareError) {
      if (error instanceof BadRequestError) {
        return this.badRequest(error.message);
      }
      if (error instanceof ForbiddenError) {
        return this.forbidden(error.message);
      }
      if (error instanceof FormError) {
        return this.formError(error.errors);
      }
      if (error instanceof NotFoundError) {
        return this.notFound(error.message);
      }
      if (error instanceof UnauthorizedError) {
        return this.unauthorized(error.message);
      }
      return this.status(error.statusCode);
    }
    return this.error(error);
  }

  public async run() {
    for (const CurrentMiddleware of this.middlewares) {
      const middleware = new CurrentMiddleware(this.req, this.res);
      const result = await middleware.runner.check();
      if (result instanceof VolatileError) {
        return this.handleError(result.error);
      }
      this.middlewareResults.set(CurrentMiddleware, result.result);
    }
    try {
      return await super.run();
    } catch (e) {
      return this.handleError(e as Error);
    }
  }
}

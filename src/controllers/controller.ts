import { Awaitable, StatusCode } from "../defs";
import Request from "../io/request";
import Response from "../io/response";

export default abstract class Controller<
  Rq extends Request,
  Rs extends Response
> {
  protected req: Rq;
  protected res: Rs;

  public constructor(req: Rq, res: Rs) {
    this.req = req;
    this.res = res;
  }

  public run() {
    return this.handle();
  }

  protected abstract handle(): Awaitable<Rs>;

  protected abstract status(code: StatusCode): Awaitable<Rs>;

  protected abstract badRequest(reason?: string): Awaitable<Rs>;

  protected abstract success<T>(value?: T): Awaitable<Rs>;

  protected abstract unauthorized(): Awaitable<Rs>;

  protected abstract formError(errors: object): Awaitable<Rs>;

  protected abstract error(error?: Error): Awaitable<Rs>;

  protected body<T = unknown>() {
    return this.req.body<T>();
  }
}

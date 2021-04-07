import { StatusCode } from "../defs";

export default abstract class MiddlewareError extends Error {
  public abstract get statusCode(): StatusCode;
}

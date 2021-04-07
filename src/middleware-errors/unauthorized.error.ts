import { StatusCode } from "../defs";
import MiddlewareError from "./middleware.error";

export default class UnauthorizedError extends MiddlewareError {
  public get statusCode(): StatusCode {
    return StatusCode.Unauthorized;
  }
}

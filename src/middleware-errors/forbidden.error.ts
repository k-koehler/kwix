import { StatusCode } from "../defs";
import MiddlewareError from "./middleware.error";

export default class ForbiddenError extends MiddlewareError {
  public get statusCode(): StatusCode {
    return StatusCode.Forbidden;
  }
}

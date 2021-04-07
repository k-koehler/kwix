import { StatusCode } from "../defs";
import MiddlewareError from "./middleware.error";

export default class NotFoundError extends MiddlewareError {
  public get statusCode(): StatusCode {
    return StatusCode.NotFound;
  }
}

import { StatusCode } from "../defs";
import MiddlewareError from "./middleware.error";

export default class InternalServerError extends MiddlewareError {
  public get statusCode(): StatusCode {
    return StatusCode.Error;
  }
}

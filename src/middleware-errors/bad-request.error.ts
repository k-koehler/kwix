import { StatusCode } from "../defs";
import MiddlewareError from "./middleware.error";

export default class BadRequestError extends MiddlewareError {
  public get statusCode(): StatusCode {
    return StatusCode.BadRequest;
  }
}

import { StatusCode } from "../defs";
import MiddlewareError from "./middleware.error";

export default class FormError extends MiddlewareError {
  public get statusCode() {
    return StatusCode.FormError;
  }

  public errors: object[];
  constructor({ message, errors }: { message?: string; errors: object[] }) {
    super(message);
    this.errors = errors;
  }
}

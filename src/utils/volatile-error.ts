export default class VolatileError<E extends Error> {
  public error: E;
  constructor(error: E) {
    this.error = error;
  }
}

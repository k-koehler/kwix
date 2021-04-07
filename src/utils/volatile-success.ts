export default class VolatileSuccess<R> {
  public result: R;
  public constructor(result: R) {
    this.result = result;
  }
}

import VolatileAsync from "./volatile-async";
import VolatileSuccess from "./volatile-success";
import VolatileError from "./volatile-error";

// TODO: generalize instead logic
// spent 30 mins fighting with the types
export default class Volatile<R, E extends Error> {
  private getVolatileResult: () => R;
  private insteadError?: Error;

  constructor(getVolatileResult: () => R) {
    this.getVolatileResult = getVolatileResult;
  }

  public instead<E2 extends Error>(e: E2) {
    this.insteadError = e;
    return (this as unknown) as Volatile<R, E2>;
  }

  public check() {
    try {
      return new VolatileSuccess(this.getVolatileResult());
    } catch (e) {
      return new VolatileError(this.insteadError || e);
    }
  }

  public use() {
    try {
      return this.getVolatileResult();
    } catch (e) {
      throw this.insteadError || e;
    }
  }

  public static async<R, E extends Error>(getVolatileResult: () => Promise<R>) {
    return new VolatileAsync<R, E>(getVolatileResult);
  }

  public async() {
    return Volatile.async<R, E>(
      (this.getVolatileResult as unknown) as () => Promise<R>
    );
  }
}

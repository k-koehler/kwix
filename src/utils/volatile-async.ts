import VolatileSuccess from "./volatile-success";
import VolatileError from "./volatile-error";

export default class VolatileAsync<R, E extends Error> {
  private getVolatileResult: () => Promise<R>;
  private insteadError?: Error;

  constructor(getVolatileResult: () => Promise<R>) {
    this.getVolatileResult = getVolatileResult;
  }

  public instead<E2 extends Error>(e: E2) {
    this.insteadError = e;
    return (this as unknown) as VolatileAsync<R, E2>;
  }

  public async use() {
    try {
      return await this.getVolatileResult();
    } catch (e) {
      throw this.insteadError || e;
    }
  }

  public async check() {
    try {
      return new VolatileSuccess(await this.getVolatileResult());
    } catch (e) {
      return new VolatileError(this.insteadError || e);
    }
  }
}

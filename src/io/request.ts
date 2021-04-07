export default abstract class Request {
  public abstract body<T = unknown>(): T;
  public abstract query<
    T extends Record<string, string | string[]> = Record<string, string[]>
  >(): T;
  public abstract headers<T = unknown>(): T;
  public abstract params<
    T extends Record<string, string> = Record<string, string>
  >(): T;
}

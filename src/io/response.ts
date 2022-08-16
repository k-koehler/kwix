export default abstract class Response {
  public abstract header(key: string, value: string): unknown;
  public abstract cookie(key: string, value: string): unknown;
}

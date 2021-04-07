export default abstract class Response {
  public abstract header(key: string, value: string): unknown;
}

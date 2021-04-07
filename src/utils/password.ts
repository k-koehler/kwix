import { Awaitable } from "..";

export default abstract class Password {
  public plaintext: string;
  constructor(plaintext: string) {
    this.plaintext = plaintext;
  }

  public abstract hash(): Awaitable<string>;

  public abstract compare(hash: string): Awaitable<boolean>;
}

import { Awaitable } from "../types";

export default abstract class HashedPassword {
  public hash: string;
  constructor(hash: string) {
    this.hash = hash;
  }
  public abstract comparePlaintext(plaintext: string): Awaitable<boolean>;
}

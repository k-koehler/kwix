type PossiblyExists<T> = T | null | undefined;

export default class Maybe<T> {
  private possibleValue: PossiblyExists<T>;
  private error: Error;
  constructor(
    possibleValue: PossiblyExists<T>,
    error = new TypeError("does not exist")
  ) {
    this.possibleValue = possibleValue;
    this.error = error;
  }
  public static exists<T>(
    possibleValue: PossiblyExists<T>
  ): possibleValue is T {
    return possibleValue !== undefined && possibleValue !== null;
  }

  public exists() {
    return Maybe.exists(this.possibleValue);
  }

  public use() {
    if (!Maybe.exists(this.possibleValue)) {
      throw this.error;
    }
    return this.possibleValue;
  }

  public instead(error: Error) {
    return new Maybe(this.possibleValue, error);
  }

  public or(value: () => NonNullable<T> | NonNullable<Promise<T>>) {
    return Maybe.exists(this.possibleValue) ? this.possibleValue : value();
  }

  public chain<T2>(transform: (value: T) => T2) {
    if (!this.exists()) {
      return new Maybe<T2>(null);
    }
    return new Maybe(transform(this.use()));
  }
}

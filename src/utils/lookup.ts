export default class Lookup<T> {
  private hash: (t: T) => string | number;
  private lookup: { [key: string]: T } = {};

  public constructor(hashFunction: (t: T) => string | number) {
    this.hash = hashFunction;
  }

  public has(t: T): boolean {
    return !!this.lookup[this.hash(t)];
  }

  public add(t: T) {
    this.lookup[this.hash(t)] = t;
    return this;
  }

  public many(ts: T[]) {
    for (const t of ts) {
      this.add(t);
    }
    return this;
  }

  public get(id: string | number): T | undefined {
    return this.lookup[id];
  }
}

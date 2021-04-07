export default function instantiate<T>(T: new () => T) {
  return new T();
}

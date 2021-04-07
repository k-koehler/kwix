export default function invoke<T>(iif: () => T) {
  return iif();
}

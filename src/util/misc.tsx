export function getUnsplashImageUrl(
  id: string,
  width: number,
  height: number
): string {
  return `https://source.unsplash.com/${id}/${width}x${height}`
}

export function compose(...funcs: Array<Function>) {
  if (funcs.length === 0) {
    // infer the argument type so it is usable in inference down the line
    return (arg: any) => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(min, value), max)
}

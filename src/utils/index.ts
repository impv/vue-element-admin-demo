/**
 * Wait <ms> milli-seconds then resolve.
 * @param ms Milli-seconds to wait
 */
export const wait = (ms: number) => new Promise<never>(resolve => {
  window.setTimeout(() => resolve(), ms)
})

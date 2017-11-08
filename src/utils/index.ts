/**
 * Wait <ms> milli-seconds then resolve.
 * @param {number} ms A time for wait
 * @returns {Promise<void>}
 */
export const wait = (ms: number) => new Promise<never>(resolve => {
  window.setTimeout(() => resolve(), ms)
})

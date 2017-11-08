/**
 * Wait <ms> milli-seconds then resolve.
 * @param {number} ms A time for wait
 * @returns {Promise<void>}
 */
export const wait = ms => new Promise(resolve => {
  window.setTimeout(() => resolve(), ms)
})

// A deadline must settle even when a browser API ignores cancellation. The original task still
// has a rejection handler, so an answer arriving after the deadline cannot become unhandled.
export function withinDeadline(task, ms, label = 'Request') {
  let timer
  return Promise.race([
    Promise.resolve().then(task),
    new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms} ms`)), ms)
    }),
  ]).finally(() => clearTimeout(timer))
}

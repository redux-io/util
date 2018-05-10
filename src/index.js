export function noop() {}

/**
 * Add property and value to object
 * @param {*} key Target property name
 * @param {*} value Target property value
 * @param {T} object Input object
 * @return {T} New object
 * @template T,U
 */
export function assoc(key, value, object) {
  return Object.assign({}, object, {[key]: value})
}

/**
 * Reduce list to a value
 * @param {function(acc: U, x: T): U} fn The iterator function. Receives two
 * values, the accumulator and the current element from the array.
 * @param {U} acc The accumulator value.
 * @param {Array.<T>} xs The list to iterate over.
 * @return {U} The final, accumulated value.
 * @template T,U
 */
export function reduce(fn, acc, xs) {
  if (xs.length === 0) {
    return acc
  }

  for (let i = 0; i < xs.length; i++) {
    acc = fn(acc, xs[i])
  }

  return acc
}

/**
 * Perform left-to-right composition of list of functions
 * @param {function[]} fns List of functions
 * @return {function} Composed function
 */
export function pipe([head, ...tail]) {
  if (tail.length === 0) return head

  return (...args) => reduce((result, fn) => fn(result), head(...args), tail)
}

/**
 * Return a new list with the elements in reverse order.
 * @param {Array.<*>} array Target array
 * @returns {Array.<*>} New reversed list.
 */
export function reverse(array) {
  return array.slice(0).reverse()
}

/**
 * Check if value is present in array
 * @param {*} x The item to compare against.
 * @param {Array.<*>} xs The array to consider.
 * @returns {boolean} `true` if an item is in the array, `false` otherwise.
 */
export function contains(x, xs) {
  return xs.indexOf(x) > -1
}

/**
 * Check if two arrays have at least one common value
 * @param {Array.<*>} xs First array to consider
 * @param {Array.<*>} ys Second array to consider
 * @returns {boolean} `true` if arrays have common values, `false` otherwise.
 */
export function intersects(xs, ys) {
  return reduce((result, x) => result || contains(x, ys), false, xs)
}

/**
 * Retrieve the value at a given path.
 * @param {Array.<string>} keys The path to use.
 * @param {Object} object The object to retrieve the nested property from.
 * @returns {?*} The data at `path`, `undefined` otherwise.
 */
export function prop(keys, object) {
  return reduce((object, key) => object && object[key], object, keys)
}

/**
 * Run predicate on the value at given path.
 * @param {function(x: *): boolean} fn Predicate
 * @param {Array.<string>} keys The path to value.
 * @param {Object} object The object to retrieve the nested property from.
 * @returns {boolean} Returns `true` if the specified object property at
 * given path satisfies the given predicate, `false` otherwise.
 */
export function propSatisfies(fn, keys, object) {
  return Boolean(fn(prop(keys, object)))
}

/**
 * Retrieve redux-io meta from action
 * @param {Object} action The action to retrieve the metadata from.
 * @returns {Object} redux-io metadata
 */
export function getMeta(action) {
  return prop(['meta', '@@redux-io'], action)
}

/**
 * Call redux-io success callback with given arguments.
 * @param {Object} action The action to retrieve success callback from.
 * @param {...*} args Arguments to pass to the callback.
 * @returns {*} Callback’s returned value.
 */
export function callSuccess(action, ...args) {
  return getMeta(action).success(...args)
}

/**
 * Call redux-io failure callback with given arguments.
 * @param {Object} action The action to retrieve failure callback from.
 * @param {...*} args Arguments to pass to the callback.
 * @returns {*} Callback’s returned value.
 */
export function callFailure(action, ...args) {
  return getMeta(action).failure(...args)
}

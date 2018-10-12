/**
 * Class to create a WeakMap cache for references to DOM elements.
 *
 */
export class CreateRefs {
  constructor() {
    // Create a WeakMap as element cache:
    this.cache = new WeakMap()
    // Create object to cache string provided as key:
    this.keys = {}
  }
  /**
   * Set a key and object to cache in refs.
   * @param {string} key
   * @param {*} element
   */
  set(key, element) {
    this.keys[key] = { key }
    this.cache.set(this.keys[key], element)
  }
  /**
   * Get the object cached in the WeakMap by providing a string key.
   * @param {string} key
   */
  get(key) {
    return this.cache.get(this.keys[key])
  }

  has(key) {
    return this.cache.has(this.keys[key])
  }

  /**
   * Delete a key and its reference from the cache.
   * @param {string} key
   */
  delete(key) {
    this.cache.delete(this.keys[key])
    delete this.keys[key]
  }
}

// Jest will resolve to correct entry point, see jest.config.js
// eslint-disable-next-line import/no-unresolved
import * as util from '@redux-io/util'

describe('@redux-io/util', () => {
  describe('assoc', () => {
    it('adds value to given key', () => {
      const input = Object.freeze({foo: 1})

      const result = util.assoc('bar', 2, input)

      expect(result.bar).toBe(2)
    })

    it('does not mutate input', () => {
      const input = Object.freeze({foo: 1})

      expect(() => util.assoc('bar', 2, input)).not.toThrow()
    })
  })

  describe('contains', () => {
    it('returns true', () => {
      const needle = 1
      const haystack = [needle, 2, 3]

      const result = util.contains(needle, haystack)

      expect(result).toBe(true)
    })

    it('returns false', () => {
      const input = [1, 2, 3]

      const result = util.contains(1337, input)

      expect(result).toBe(false)
    })
  })

  describe('intersects', () => {
    it('returns true', () => {
      const value = 1
      const left = [0, value]
      const right = [value, 2, 3]

      const result = util.intersects(left, right)

      expect(result).toBe(true)
    })

    it('returns false', () => {
      const left = [1, 2, 3]
      const right = [4, 5, 6]

      const result = util.intersects(left, right)

      expect(result).toBe(false)
    })
  })

  describe('noop', () => {
    it('returns undefined', () => {
      expect(util.noop()).toBeUndefined()
    })
  })

  describe('pipe', () => {
    it('unwraps single function', () => {
      const identity = x => x

      const result = util.pipe([identity])

      expect(result).toBe(identity)
    })

    it('performs left-to-right composition', () => {
      const multiply = (x, y) => x * y
      const increment = x => x + 1

      const result = util.pipe([multiply, increment])

      expect(result(2, 4)).toBe(increment(multiply(2, 4)))
    })
  })

  describe('prop', () => {
    it('returns nested value', () => {
      const object = {foo: {bar: {baz: 1}}}

      const result = util.prop(['foo', 'bar', 'baz'], object)

      expect(result).toBe(1)
    })

    it('returns undefined', () => {
      const object = {}

      const result = util.prop(['foo', 'bar', 'baz'], object)

      expect(result).toBeUndefined()
    })
  })

  describe('propSatisfies', () => {
    it('returns true', () => {
      const pred = x => x === 1
      const object = {foo: {bar: {baz: 1}}}

      const result = util.propSatisfies(pred, ['foo', 'bar', 'baz'], object)

      expect(result).toBe(true)
    })

    it('returns false', () => {
      const pred = x => x
      const object = {}

      const result = util.propSatisfies(pred, ['foo', 'bar', 'baz'], object)

      expect(result).toBe(false)
    })
  })

  describe('reduce', () => {
    it('reduces arrays with the supplied accumulator', () => {
      const add = (x, y) => x + y
      const acc = 0
      const input = [1, 2, 3, 4]

      const result = util.reduce(add, acc, input)

      expect(result).toBe(10)
    })

    it('returns the accumulator for an empty array', () => {
      const concat = jest.fn()
      const acc = []
      const input = []

      const result = util.reduce(concat, acc, input)

      expect(concat).toHaveBeenCalledTimes(0)
      expect(result).toBe(acc)
    })
  })

  describe('reverse', () => {
    it('returns reversed list', () => {
      const input = [0, 1, 2]

      const result = util.reverse(input)

      expect(result).toEqual([2, 1, 0])
    })
  })
})

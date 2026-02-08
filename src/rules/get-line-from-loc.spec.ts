import { describe, it, expect } from 'vitest'
import getLineFromLoc from './get-line-from-loc.js'

describe('getLineFromLoc', () => {
  it('should return line number from location', () => {
    const loc = {
      start: { line: 5, column: 0 },
      end: { line: 5, column: 10 },
    }
    expect(getLineFromLoc(loc)).toBe(5)
  })

  it('should return 0 for null location', () => {
    expect(getLineFromLoc(null)).toBe(0)
  })

  it('should return 0 for undefined location', () => {
    expect(getLineFromLoc(undefined)).toBe(0)
  })
})

import { reducer, defState } from "../Reducer";
const deepFreeze = require('deep-freeze')

describe('Reducer tests:', () => {
  test('verify that the reducer returns a proper value when a initial state is not provided', () => {
    const newState = reducer(undefined, { type: 'DO_NOTHING' })
    expect(newState).toEqual(defState)
  })

  test('verify that the reducer is a pure function', () => {
    let defSt ={...defState}
    deepFreeze(defSt)
    defSt = reducer(defSt, { type: 'INCREMENT', payload: 'good' })
    expect(defSt).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })
})
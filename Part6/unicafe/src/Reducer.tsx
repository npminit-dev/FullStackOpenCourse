export type state = {
  good: number,
  ok: number,
  bad: number,
}

export const defState: state = {
  good: 0,
  ok: 0,
  bad: 0
}

export type action = {
  type: 'INCREMENT'|'SETDEFAULT'|'DO_NOTHING',
  payload?: 'good'|'ok'|'bad'
}

export function reducer(state: state|undefined = defState, action: action): state {
  switch(action.type) {
    case 'INCREMENT': {
      let newState: state = { ...state }
      action.payload && newState[action.payload]++
      return newState
    }
    case 'SETDEFAULT': return defState
    case 'DO_NOTHING': return defState
    default: return state
  }
}

// We'll dive deeper into middleware later.
// For now, it's enough to know that this loggerMiddleware prints out useful
// information about everything that happens in your store.
// Much like requests in express pass from middleware to middleware, actions in redux
// pass from middleware to middleware. The loggerMiddleware gets a chance to see
// actions before they are processed. They get in the middle, hence, middleware.
import { createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'

// We'll soon revisit the initial state of this application.
const initialState = {
  grid: [
    Array(20).fill('')
  ],
  selectedColor: 'red'
}

// ACTION TYPES
const ADDROW = 'ADDROW'
const SELECTCOLOR = 'SELECTCOLOR'
const CHANGECOLOR = 'CHANGECOLOR'

// ACTION CREATORS
export const addRow = { type: ADDROW}
export const selectColor = (color) => ({ type: SELECTCOLOR, color})
export const changeColor = (row,column) => ({type: CHANGECOLOR, row, column})

// And we'll revisit this reducer.
function reducer (state = initialState, action) {
  switch (action.type) {
    case ADDROW:
      const newRow =  Array(20).fill('');
      return { ...state, grid: [...state.grid, newRow]}
    case SELECTCOLOR:
      return { ...state, selectedColor: action.color }
    case CHANGECOLOR:
      const newTable = [...state.grid]
      newTable[action.row] = [...newTable[action.row]]
      newTable[action.row][action.column] = state.selectedColor
      return { ...state, grid: newTable }
    default:
      return state
  }
}

const store = createStore(
  reducer,
  applyMiddleware(loggerMiddleware)
)

export default store

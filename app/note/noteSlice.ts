import { ICard, ICardAfterParsed } from '@/models/Card'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



export interface NoteState {
  value: number
  textSearchedCards: ICardAfterParsed[]
  laterDoPin: boolean
  changePin: boolean

}

const initialState: NoteState = {
  value: 0,
  textSearchedCards:[],
  laterDoPin: false,
  changePin: false

}

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    addSearchedCard: (state, action: PayloadAction<ICardAfterParsed[]>) => {
      state.textSearchedCards = action.payload
    },
    laterDoPin: (state, action: PayloadAction<boolean>) => {
      state.laterDoPin = action.payload
    },
    doPin: (state, action: PayloadAction<boolean>) => {
      state.laterDoPin = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, addSearchedCard, laterDoPin ,doPin} = noteSlice.actions
const counterReducer = noteSlice.reducer
export default counterReducer
import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit'
import stocksReducer from './slices/stocks-slice'

export const store = configureStore({
    reducer: {
        stocksPage: stocksReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<Promise<void>, RootState, unknown, AnyAction>

export default store
import { RootState } from '../store'

export const selectStocks = (state: RootState) => state.stocksPage.stocks
export const selectChangeInProgress = (state: RootState) => state.stocksPage.changeInProgress
export const selectFetchInterval = (state: RootState) => state.stocksPage.fetchInterval
export const selectIsFetching = (state: RootState) => state.stocksPage.isFetching
export const selectIsConnected = (state: RootState) => state.stocksPage.isConnected
export const selectToast = (state: RootState) => state.stocksPage.toast
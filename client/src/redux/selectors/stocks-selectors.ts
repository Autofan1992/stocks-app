import { RootState } from '../store'

export const getStocks = (state: RootState) => state.stocksPage.stocks
export const getChangeInProgress = (state: RootState) => state.stocksPage.changeInProgress
export const getFetchInterval = (state: RootState) => state.stocksPage.fetchInterval
export const getIsFetching = (state: RootState) => state.stocksPage.isFetching
export const getIsConnected = (state: RootState) => state.stocksPage.isConnected
export const getToast = (state: RootState) => state.stocksPage.toast
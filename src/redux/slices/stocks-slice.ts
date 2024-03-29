import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { StockNames, StockType } from "../../types/stock-types"
import { ToastType, ToastVariants } from "../../types/toast-types"
import { dateFormatter } from "../../utils"

export const initialState = {
    toast: {
        show: false,
        message: null,
        variant: ToastVariants.Info,
    } as ToastType,
    isConnected: false,
    isFetching: false,
    fetchInterval: 5,
    changeInProgress: [] as string[],
    socketId: null as string | null,
    stocksGroup: [
        StockNames.Apple,
        StockNames.Amazon,
        StockNames.Alphabet,
        StockNames.Facebook,
        StockNames.Microsoft,
        StockNames.Tesla,
    ] as string[],
    stocks: [] as StockType[],
}

const stocksSlice = createSlice({
    name: "stocks",
    initialState,
    reducers: {
        setIsConnected: (state, { payload }: PayloadAction<boolean>) => {
            state.isConnected = payload
        },
        setIsFetching: (state, { payload }: PayloadAction<boolean>) => {
            state.isFetching = payload
        },
        setSocketId: (state, { payload }: PayloadAction<string | null>) => {
            state.socketId = payload
        },
        showToast: (state, { payload }: PayloadAction<ToastType>) => {
            state.toast.show = payload.show
            state.toast.message = payload.message
            state.toast.variant = payload.variant
        },
        setStocks: (state, { payload }: PayloadAction<StockType[]>) => {
            state.changeInProgress = []
            state.stocks = payload.map(newStock => {
                const date = new Date()
                const prevStock = state.stocks.find(
                    stock => stock.ticker === newStock.ticker
                )

                if (prevStock) {
                    newStock.priceHistory = [
                        ...prevStock.priceHistory,
                        newStock.price,
                    ]
                    newStock.priceChangeTime = [
                        ...prevStock.priceChangeTime,
                        dateFormatter(date),
                    ]
                    newStock.priceChange = Math.floor(
                        Math.abs(+prevStock.price - +newStock.price)
                    )
                    return newStock
                }

                return {
                    ...newStock,
                    priceHistory: [newStock.price],
                    priceChangeTime: [dateFormatter(date)],
                    priceChange: 0,
                }
            })
        },
        addStockTitle: (state, { payload }: PayloadAction<string>) => {
            state.stocksGroup.push(payload)
        },
        removeStockTitle: (state, { payload }: PayloadAction<string>) => {
            state.stocksGroup = state.stocksGroup.filter(
                title => title !== payload
            )
            state.stocks = state.stocks.filter(
                stock => stock.ticker !== payload
            )
        },
        setFetchInterval: (state, { payload }: PayloadAction<number>) => {
            state.fetchInterval = payload
        },
        setChangeInProgress: (state, { payload }: PayloadAction<string>) => {
            state.changeInProgress.push(payload)
        },
    },
})

export const {
    setStocks,
    showToast,
    setChangeInProgress,
    addStockTitle,
    removeStockTitle,
    setFetchInterval,
    setIsFetching,
    setSocketId,
    setIsConnected,
} = stocksSlice.actions

export default stocksSlice.reducer

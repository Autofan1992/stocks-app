import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StockNames, StockType } from '../../types/stock-types'
import { AppThunk } from '../store'
import { io } from 'socket.io-client'
import { ToastType, ToastVariants } from '../../types/toast-types'

const SECONDS_TO_MS = 1000

export const initialState = {
    toast: {
        show: false,
        message: null,
        variant: ToastVariants.Info
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
    stocks: [] as StockType[]
}

const socket = io()

export const getTickers = (): AppThunk => async (dispatch, getState) => {
    let errorsCount = 0

    socket.on('connect', () => {
        const { stocksPage: { stocksGroup, socketId } } = getState()

        socket.emit('start', stocksGroup)
        dispatch(setIsFetching(true))
        dispatch(setIsConnected(true))
        dispatch(setSocketId(socket.id))

        if (errorsCount === 1 && socketId !== socket.id) {
            dispatch(showToast({
                show: true,
                message: 'Successfully reconnected to the server',
                variant: ToastVariants.Success
            }))

            errorsCount = 0
        }
    })

    socket.on('ticker', (ticker: StockType[]) => {
        const { stocksPage: { isFetching } } = getState()

        dispatch(setStocks(ticker))
        if (isFetching) dispatch(setIsFetching(false))
    })

    socket.on('connect_error', () => {
        if (errorsCount === 0) {
            dispatch(showToast({
                show: true,
                message: 'The low-level connection cannot be established. We will notify you on reconnect',
                variant: ToastVariants.Danger
            }))
        }

        errorsCount = 1
    })
}

export const changeStocksGroup = (method: 'add' | 'remove', title: string): AppThunk => async (dispatch, getState) => {
    const getStocksGroup = () => getState().stocksPage.stocksGroup

    if (method === 'add') {
        if (getStocksGroup().includes(title)) {
            dispatch(showToast({
                show: true,
                message: 'Stock with the same title already exists',
                variant: ToastVariants.Warning
            }))
            return
        } else {
            dispatch(addStockTitle(title))
            dispatch(showToast({
                show: true,
                message: `${title} is added to watching group`,
                variant: ToastVariants.Success
            }))
        }
    }
    if (method === 'remove') {
        dispatch(removeStockTitle(title))
        dispatch(showToast({
            show: true,
            message: `${title} has been removed from watching group`,
            variant: ToastVariants.Success
        }))
    }

    dispatch(setChangeInProgress(title))

    socket.emit('updateTickers', getStocksGroup())
}

export const changeFetchInterval = (interval: number): AppThunk => async (dispatch) => {
    if (interval !== 0) {
        dispatch(setFetchInterval(interval))
        socket.emit('updateInterval', (interval * SECONDS_TO_MS))
        dispatch(showToast({
            show: true,
            message: `Watching interval is changed to ${interval} sec`,
            variant: ToastVariants.Success
        }))
    }
}

export const disconnectSocket = () => socket.disconnect()

const stocksSlice = createSlice({
    name: 'stocks',
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
            state.stocks = payload
        },
        addStockTitle: (state, { payload }: PayloadAction<string>) => {
            state.stocksGroup.push(payload)
        },
        removeStockTitle: (state, { payload }: PayloadAction<string>) => {
            state.stocksGroup = state.stocksGroup.filter(title => title !== payload)
            state.stocks = state.stocks.filter(stock => stock.ticker !== payload)
        },
        setFetchInterval: (state, { payload }: PayloadAction<number>) => {
            state.fetchInterval = payload
        },
        setChangeInProgress: (state, { payload }: PayloadAction<string>) => {
            state.changeInProgress.push(payload)
        },
    }
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
    setIsConnected
} = stocksSlice.actions

export default stocksSlice.reducer
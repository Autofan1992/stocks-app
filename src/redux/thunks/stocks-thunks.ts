import { AppThunk } from '../store'
import { ToastVariants } from '../../types/toast-types'
import { StockType } from '../../types/stock-types'
import {
    addStockTitle, removeStockTitle, setChangeInProgress, setFetchInterval,
    setIsConnected,
    setIsFetching,
    setSocketId,
    setStocks,
    showToast
} from '../slices/stocks-slice'
import { socket } from '../../api/stocks-api'

const SECONDS_TO_MS = 1000

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

    socket.on('disconnect', () => {
        dispatch(setIsConnected(false))
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
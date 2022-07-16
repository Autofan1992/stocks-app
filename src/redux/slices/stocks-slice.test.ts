import { ToastVariants } from '../../types/toast-types'
import stocksReducer, {
    addStockTitle,
    initialState, removeStockTitle,
    setChangeInProgress,
    setFetchInterval,
    setStocks,
    showToast
} from './stocks-slice'
import { changeStocksGroup } from '../thunks/stocks-thunks'

let state = JSON.parse(JSON.stringify(initialState))

beforeEach(() => {
    state = JSON.parse(JSON.stringify(initialState))
})

test('change fetch interval', () => {
    const newState = stocksReducer(state, setFetchInterval(10))

    expect(newState.fetchInterval).toBe(10)
})

test('add stock title to watching group', () => {
    const newState = stocksReducer(state, addStockTitle('testTitle'))

    expect(newState.stocksGroup).toContain('testTitle')
})

test('set stock to state', () => {
    const newState = stocksReducer(state, setStocks([
        {
            change: 20,
            price: 30,
            ticker: 'testTitle',
            last_trade_time: '12.12.12',
            change_percent: 2,
            dividend: 5,
            exchange: 'test',
            yield: 1,
        }
    ]))

    expect(newState.stocks.length).toBe(1)
})

const dispatchMock = jest.fn()

test('change stocks group (add)', async () => {
    const thunk = changeStocksGroup('add', 'test')
    const getStateMock = jest.fn(() => {
        return { stocksPage: { ...state } }
    })

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, addStockTitle('test'))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, showToast({
        show: true,
        message: `test is added to watching group`,
        variant: ToastVariants.Success
    }))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, setChangeInProgress('test'))

})

test('change stocks group (remove)', async () => {
    const thunk = changeStocksGroup('remove', 'test')
    const getStateMock = jest.fn(() => {
        return { stocksPage: { ...state } }
    })

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, removeStockTitle('test'))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, showToast({
        show: true,
        message: `test has been removed from watching group`,
        variant: ToastVariants.Success
    }))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, setChangeInProgress('test'))

})


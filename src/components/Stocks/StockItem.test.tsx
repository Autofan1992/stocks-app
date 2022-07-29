import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../../redux/store'
import StockItem from './StockItem'

describe('Stock Item', () => {
    const { queryByTestId } = render(<Provider store={store}>
        <StockItem
            priceChange={0}
            priceChangeTime={[]}
            price={'30'}
            ticker="testTitle"
            priceHistory={[]}
            last_trade_time="12.12.12"
            change_percent={2}
            dividend={5}
            exchange="test"
            yield={1}
        />
    </Provider>)

    const stockTitle = queryByTestId('stock-title')
    const stockPrice = queryByTestId('stock-price')

    it('renders correctly', () => {
        expect(stockTitle).toBeTruthy()
        expect(stockPrice).toBeTruthy()
    })

    it('should display message if there no stocks in watching group', () => {
        expect(stockTitle).toHaveTextContent('testTitle')
        expect(stockPrice).toHaveTextContent('30')
    })
})
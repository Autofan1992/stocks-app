import { render } from '@testing-library/react'
import StocksList from './StocksList'
import { Provider } from 'react-redux'
import store from '../../redux/store'

describe('Stocks list', () => {
    const { queryByTestId } = render(<Provider store={store}>
        <StocksList/>
    </Provider>)
    const listGroup = queryByTestId('stocks-list-group')

    it('renders correctly', () => {
        expect(listGroup).toBeTruthy()
    })
    it('should display message if is not connected to socket', () => {
        expect(listGroup).toHaveTextContent('Loading...')
    })
})
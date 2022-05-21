import { act, fireEvent, render } from '@testing-library/react'
import AddStockForm from './AddStockForm'
import { Provider } from 'react-redux'
import store from '../../redux/store'

describe('Add Stock Form', () => {
    const { queryByTestId } = render(<Provider store={store}>
        <AddStockForm/>
    </Provider>)

    const searchInput = queryByTestId('add-title-input')

    it('renders correctly', () => {
        expect(searchInput).toBeTruthy()
    })

    it('updates on change', async () => {
        await act(async () => {
            fireEvent.change(searchInput as HTMLInputElement, { target: { value: 'test' } })
        })

        expect((searchInput as HTMLInputElement).value).toBe('test')
    })
})
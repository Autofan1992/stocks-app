import { FC } from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { selectToast } from '../../../redux/selectors/stocks-selectors'
import { showToast } from '../../../redux/reducers/stocks-reducer'
import ReactDOM from 'react-dom'

const ErrorToast: FC = () => {
    const dispatch = useAppDispatch()
    const { message, variant, show } = useAppSelector(selectToast)

    const handleClose = () => {
        dispatch(showToast({ message, show: false }))
    }

    return ReactDOM.createPortal(
        <ToastContainer
            position="middle-center"
            className="p-3 app-error-toast"
            style={{
                zIndex: 200
            }}>
            <Toast
                className="app-error-toast position-relative bg-opacity-75"
                bg={variant}
                onClose={handleClose}
                show={show}
                delay={5000}
                autohide
            >
                <Toast.Body className='fs-6 fw-bold'>{message}</Toast.Body>
            </Toast>
        </ToastContainer>,
        document.getElementById('toast-root') as Element
    )
}

export default ErrorToast
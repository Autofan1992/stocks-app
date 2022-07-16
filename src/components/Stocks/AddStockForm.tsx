import { Formik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Button, FloatingLabel, Form, InputGroup } from 'react-bootstrap'
import { selectIsConnected } from '../../redux/selectors/stocks-selectors'
import { changeStocksGroup } from '../../redux/thunks/stocks-thunks'

const StockSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Title is too Short!')
        .max(100, 'Title is too Long!')
        .required('Title is required'),
})

const AddStockForm = () => {
    const isConnected = useAppSelector(selectIsConnected)
    const dispatch = useAppDispatch()

    return <>
        <Formik
            initialValues={{
                title: ''
            }}
            validationSchema={StockSchema}
            onSubmit={async ({ title }, { resetForm }) => {
                await dispatch(changeStocksGroup('add', title))
                resetForm()
            }}>
            {({ handleSubmit, errors, touched, values, handleChange }) => (
                <Form onSubmit={handleSubmit}>
                    <InputGroup>
                        <Form.Group className="flex-grow-1">
                            <FloatingLabel
                                controlId="title"
                                label="Stock title"
                            >
                                <Form.Control
                                    data-testid='add-title-input'
                                    className={touched.title && errors.title ? 'is-invalid' : undefined}
                                    placeholder="Type stock title"
                                    onChange={handleChange}
                                    value={values.title}
                                    name="title"
                                    type="text"
                                    required
                                />
                                <Form.Control.Feedback type="invalid" tooltip>{errors.title}</Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                        <Button
                            disabled={!isConnected}
                            variant="primary"
                            type="submit"
                        >Add stock</Button>
                    </InputGroup>
                </Form>
            )}
        </Formik>
    </>
}

export default AddStockForm
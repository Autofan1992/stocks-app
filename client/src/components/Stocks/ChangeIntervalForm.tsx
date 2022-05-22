import { Formik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Button, FloatingLabel, Form, InputGroup } from 'react-bootstrap'
import { getFetchInterval, getIsConnected } from '../../redux/selectors/stocks-selectors'
import * as Yup from 'yup'
import { changeFetchInterval } from '../../redux/thunks/stocks-thunks'

const StockSchema = Yup.object().shape({
    fetchInterval: Yup.number()
        .min(2, 'Min interval is 2 sec!')
        .max(10, 'Max interval is 10sec!')
})

const ChangeIntervalForm = () => {
    const isConnected = useAppSelector(getIsConnected)
    const fetchInterval = useAppSelector(getFetchInterval)
    const dispatch = useAppDispatch()

    return <>
        <Formik
            initialValues={{
                fetchInterval
            }}
            validationSchema={StockSchema}
            onSubmit={async ({ fetchInterval }) => {
                await dispatch(changeFetchInterval(fetchInterval))
            }}>
            {({ handleSubmit, values, handleChange, errors, touched }) => (
                <Form onSubmit={handleSubmit}>
                    <InputGroup className="mb-3">
                        <FloatingLabel
                            controlId="fetchInterval"
                            label="Fetch interval in seconds"
                            className="flex-grow-1"
                        >
                            <Form.Control
                                onChange={handleChange}
                                className={touched.fetchInterval && errors.fetchInterval ? 'is-invalid' : undefined}
                                value={values.fetchInterval}
                                name="fetchInterval"
                                type="number"
                                min={1}
                                max={10}
                                required
                            />
                            <Form.Control.Feedback type="invalid" tooltip>{errors.fetchInterval}</Form.Control.Feedback>
                        </FloatingLabel>
                        <Button
                            disabled={!isConnected}
                            variant="primary"
                            type="submit"
                        >Change interval</Button>
                    </InputGroup>
                </Form>
            )}
        </Formik>
    </>
}

export default ChangeIntervalForm
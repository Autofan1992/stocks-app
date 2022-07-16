import { FC, memo, useEffect, useState } from 'react'
import { StockType } from '../../types/stock-types'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectChangeInProgress } from '../../redux/selectors/stocks-selectors'
import Xcircle from '../Icons/Xcircle'
import ArrowDown from '../Icons/ArrowDown'
import ArrowUp from '../Icons/ArrowUp'
import { currencyFormatter } from '../../utils'
import { changeStocksGroup } from '../../redux/thunks/stocks-thunks'

const StockItem: FC<StockType> = memo(({ ticker, price, change }) => {
    const dispatch = useAppDispatch()
    const changeInProgress = useAppSelector(selectChangeInProgress)
    const [priceDirection, setPriceDirection] = useState<'text-danger' | 'text-success' | ''>('')
    const [isIntersecting, setIsIntersecting] = useState(true)
    const [currentStock, setCurrentStock] = useState({ ticker, price, change })

    useEffect(() => {
        if (isIntersecting) {
            setCurrentStock({ ticker, price, change })
            setPriceDirection(currentStock.price > price ? 'text-danger' : 'text-success')
        }
    }, [price, change, ticker])

    const removeStock = (title: string) => dispatch(changeStocksGroup('remove', title))

    return <Row className='align-items-baseline'>
        <Col xs={3}>
            <h5 data-testid="stock-title">{currentStock.ticker}</h5>
        </Col>
        <Col xs={5}>
            <h6 data-testid="stock-price">
                {currencyFormatter.format(currentStock.price)}&nbsp;
                {isIntersecting &&
                    <>
                        {priceDirection === 'text-success'
                            && <sup
                                className={priceDirection}
                            >
                                <ArrowUp size={16}/>
                                {currentStock.change}
                            </sup>}
                        {priceDirection === 'text-danger'
                            && <sub
                                className={priceDirection}
                            >
                                <ArrowDown size={16}/>
                                {currentStock.change}
                            </sub>}
                    </>
                }
            </h6>
        </Col>
        <Col className="ms-md-auto order-1 order-md-0" xs="auto">
            <Form.Check
                onChange={() => setIsIntersecting(!isIntersecting)}
                checked={isIntersecting}
                type="switch"
                id={currentStock.ticker}
                label="update stock"
            />
        </Col>
        <Col className="ms-auto" xs="auto">
            <Button
                size="sm"
                variant="danger"
                className="mb-1 mt-md-0 d-inline-flex align-items-center justify-content-center"
                disabled={changeInProgress.includes(currentStock.ticker)}
                onClick={() => removeStock(currentStock.ticker)}
            ><Xcircle size={16}/></Button>
        </Col>
    </Row>
})

export default StockItem
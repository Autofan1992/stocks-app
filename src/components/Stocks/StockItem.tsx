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
import { Line } from 'react-chartjs-2'
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        }
    },
}

const StockItem: FC<StockType> = memo(({ ticker, price, priceChange, priceHistory, priceChangeTime }) => {
    const dispatch = useAppDispatch()
    const changeInProgress = useAppSelector(selectChangeInProgress)
    const [priceDirection, setPriceDirection] = useState<'text-danger' | 'text-success' | ''>('')
    const [isIntersecting, setIsIntersecting] = useState(true)
    const [currentStock, setCurrentStock] = useState({ ticker, price, priceChange, priceHistory, priceChangeTime })

    useEffect(() => {
        if (isIntersecting) {
            setCurrentStock(prevStock => {
                setPriceDirection(+prevStock.price > +price ? 'text-danger' : 'text-success')
                return { ticker, price, priceChange, priceHistory, priceChangeTime }
            })
        }
    }, [price, isIntersecting, priceChange, ticker, priceHistory, priceChangeTime])

    const removeStock = (title: string) => dispatch(changeStocksGroup('remove', title))

    const data = {
        labels: currentStock.priceChangeTime,
        datasets: [
            {
                data: currentStock.priceHistory,
                borderColor: '#0d6efd',
                backgroundColor: 'rgba(13,110,253,0.5)',
            },
        ],
    }

    return (
        <div className="border p-3">
            <Row className="align-items-baseline">
                <Col xs="auto">
                    <h5 data-testid="stock-title">{currentStock.ticker}</h5>
                </Col>
                <Col xs={6} md>
                    <h6 data-testid="stock-price">
                        {currencyFormatter(+price)}&nbsp;
                        {(isIntersecting && currentStock.priceChange > 0) &&
                            <>
                                {priceDirection === 'text-success'
                                    && <sup
                                        className={priceDirection}
                                    >
                                        <ArrowUp size={16}/>
                                        {currencyFormatter(currentStock.priceChange)}
                                    </sup>}
                                {priceDirection === 'text-danger'
                                    && <sub
                                        className={priceDirection}
                                    >
                                        <ArrowDown size={16}/>
                                        {currencyFormatter(currentStock.priceChange)}
                                    </sub>}
                            </>
                        }
                    </h6>
                </Col>
                <Col className="ms-md-auto" xs="auto">
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
                <div>
                    <hr/>
                </div>
                <Col>
                    <Line options={options} data={data}/>
                </Col>
            </Row>
        </div>
    )
})

export default StockItem
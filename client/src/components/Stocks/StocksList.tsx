import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { FC, memo, useEffect } from 'react'
import { disconnectSocket, getTickers } from '../../redux/reducers/stocks-reducer'
import { getIsConnected, getIsFetching, getStocks } from '../../redux/selectors/stocks-selectors'
import { ListGroup, Spinner } from 'react-bootstrap'
import { AnimatePresence, motion } from 'framer-motion'
import StockItem from './StockItem'

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        }
    }
}

const StocksList: FC = memo(() => {
    const dispatch = useAppDispatch()
    const stocks = useAppSelector(getStocks)
    const isFetching = useAppSelector(getIsFetching)
    const isConnected = useAppSelector(getIsConnected)

    useEffect(() => {
        dispatch(getTickers())

        return () => {
            disconnectSocket()
        }
    }, [dispatch])

    return <ListGroup className="my-4 my-lg-5" data-testid="stocks-list-group">
        <AnimatePresence>
            {stocks.length > 0
                ? stocks.map(stock => <motion.div
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: 'spring', stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="list-group-item"
                        key={stock.ticker}
                    >
                        <StockItem {...stock} />
                    </motion.div>
                )
                : isConnected && !isFetching
                    ? <h3>There're no stocks in your watching group</h3>
                    : <div className="text-center py-5">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
            }
        </AnimatePresence>
    </ListGroup>

})

export default StocksList
import StocksList from '../Stocks/StocksList'
import { Col, Container, Row } from 'react-bootstrap'
import AddStockForm from '../Stocks/AddStockForm'
import ErrorToast from '../common/ErrorToast/ErrorToast'
import ChangeIntervalForm from '../Stocks/ChangeIntervalForm'

function App() {
    const now = new Date()

    return <>
        <div className="app-wrapper min-vh-100 d-flex flex-column justify-content-between">
            <header className="header py-5">
                <Container>
                    <h1>Stocks App</h1>
                </Container>
            </header>
            <main>
                <section className="stocks-list">
                    <Container>
                        <Row>
                            <Col xl={10}>
                                <AddStockForm/>
                                <StocksList/>
                                <ChangeIntervalForm/>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </main>
            <footer className="footer py-5">
                <Container>
                    <p>{now.getUTCFullYear()}</p>
                </Container>
            </footer>
        </div>
        <ErrorToast/>
    </>
}

export default App

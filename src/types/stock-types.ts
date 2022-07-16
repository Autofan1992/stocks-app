export type StockType = {
    ticker: string,
    exchange: string
    price: number
    change: number
    change_percent: number
    dividend: number
    yield: number
    last_trade_time: string
}

export enum StockNames {
    Apple = 'AAPL',
    Alphabet = 'GOOGL',
    Microsoft = 'MSFT',
    Amazon = 'AMZN',
    Facebook = 'FB',
    Tesla = 'TSLA',
}
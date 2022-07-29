export type StockType = {
    ticker: string,
    exchange: string
    price: string
    priceHistory: string[]
    priceChangeTime: string[]
    priceChange: number
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
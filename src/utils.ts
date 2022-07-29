const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: 'usd',
    style: 'currency',
    currencyDisplay: 'narrowSymbol'
})

export const currencyFormatter = (val: number) => CURRENCY_FORMATTER.format(val)
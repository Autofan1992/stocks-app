export const currencyFormatter = new Intl.NumberFormat(undefined, {
    currency: 'usd',
    style: 'currency',
    currencyDisplay: 'narrowSymbol'
})
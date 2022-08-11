const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "usd",
    style: "currency",
    currencyDisplay: "narrowSymbol",
})

const DATE_FORMATTER = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
})

export const currencyFormatter = (val: number) => CURRENCY_FORMATTER.format(val)
export const dateFormatter = (date: Date) => DATE_FORMATTER.format(date)

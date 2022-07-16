export enum ToastVariants {
    Info = 'info',
    Success = 'success',
    Warning = 'warning',
    Danger = 'danger',
}

export type ToastType = {
    show: boolean
    variant?: ToastVariants
    message: string | null
}
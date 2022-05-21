import { FC } from 'react'

const ArrowDown: FC<{size: number}> = ({size}) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor"
                className="bi bi-arrow-down-short" viewBox="0 0 16 16">
        <path fillRule="evenodd"
              d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
    </svg>
}

export default ArrowDown
import { io } from 'socket.io-client'

export const socket = io('https://stocks-server-8.herokuapp.com/')
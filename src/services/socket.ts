import React from 'react';
import io from 'socket.io-client';
import { SERVER_URL } from '../utils/constants.ts';

export const socket = io(SERVER_URL);
export const SocketContext = React.createContext(socket);

// Sends a message through the specified channel.
export const sendMessage = (channel: string, msg: string) => {
    socket.emit(channel, msg);
    console.log("Emitted: " + channel + " - " + msg);
}
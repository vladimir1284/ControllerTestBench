import { kitql } from '@kitql/all-in';
import { sveltekit } from '@sveltejs/kit/vite';
import houdini from 'houdini/vite';

import { Server } from 'socket.io'

import modbusServer from './modbus_server';

import Terminal from 'vite-plugin-terminal'

const webSocketServer = {
    name: 'webSocketServer',
    configureServer(server) {
        const io = new Server(server.httpServer)

        io.on('connection', (socket) => {
            socket.emit('eventFromServer', 'Hello, World 👋')
        })
    },
}



import type { UserConfig } from 'vite';

const config: UserConfig = {
    plugins: [kitql(), houdini(), sveltekit(), Terminal(), webSocketServer, modbusServer({ port: 4000 })]
};

export default config;

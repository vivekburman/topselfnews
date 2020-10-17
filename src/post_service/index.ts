import {server} from './server/server';
import {config} from './config/config';
import { Application } from 'express';

const startService = async () => {
    // start the server
    let app: Error | Application | null = null;
    console.log('-- Post Service --');
    try{
        app = await server.start(config.serverSettings.port);
        console.log(`Post Server has started in port number = ${config.serverSettings.port}`);
    }catch(err) {
        console.log('Error starting server = ', err);
    };
    return app;
}

export const postService = Object.assign({}, {startService});
import {server} from './server/server';
import {config} from './config/config';
import * as http from 'http';
import * as https from 'https';

const startService = async () => {
    // start the server
    let app: Error | http.Server | https.Server | null = null;
    console.log('-- Auth Service --');
    try{
        app = await server.start(config.serverSettings.port);
        console.log(`Auth Server has started in port number = ${config.serverSettings.port}`);
    }catch(err) {
        console.log('Error starting server = ', err);
    };
    return app;
}


export const authService = Object.assign({}, {startService});
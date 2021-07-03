import Hapi from '@hapi/hapi';
import * as admin from 'firebase-admin';
import routes from './routes';
import { db } from './database';
import credentials from '../credentials.json';

admin.initializeApp({
    credential: admin.credential.cert(credentials)
})

let server;

const start = async () => {
    server = Hapi.server({
        debug: { request: ['error'] },
        port: 8000,
        host: 'localhost',
        "routes": {
            "cors": true
        }})

    routes.forEach(route => server.route(route));
    //First implementation before having routes in our app:
// server.route({
//     method: 'POST',
//     path: '/hello',
//      //gets called whenever the serevr receives the correct type of request, whatever we return from a handler is sent back to the client as response, req is the request object contating the request details and h is the response tool kit
//     handler: (req, h) => {    
//         const payload = req.payload;  //req body
//         const name = payload.name;            
//         return `Hello ${name}!`; // by defaut , http code will be 200
//         //for custom http code
//         //return h.response('Hello!').code(201); 
//     }
// })

//Calling database before starting the server
    db.connect();
    await server.start();
    console.log(`Server is listening on ${server.info.uri}`);
}

process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});

process.on('SIGINT', async() => {
    console.log('Stopping server...');
    await server.stop({timeout: 1000});
    db.end();
    console.log('Server stopped');
    process.exit(0);
});

start();
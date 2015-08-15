import express from 'express';
import { getSchema } from './BudgetSchema';
import graphQLHTTP from 'express-graphql';
import debug from 'debug';
import bodyParser from 'body-parser';
import Database from './Database';
import createWebpackDevServer from './createWebpackDevServer';
import path from 'path';

const log = debug('hdo-budget:server');

Database.get()
    .then(db => getSchema(db))
    .then(schema => {
        const app = express();

        app.use(bodyParser.json());
        app.get('/*', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../../public/index.html'));
        });

        app.use('/graphql', graphQLHTTP({
            schema,
            pretty: process.env.NODE_ENV !== 'production'
        }));

        const host = '0.0.0.0';
        const port = process.env.HTTP_PORT || 3000;

        if (process.env.NODE_ENV !== 'production') {
            app.set('json spaces', 2);

            const piping = require('piping');

            if (piping()) {
                const server = app.listen(port, host, () => {
                    log('server listening on http://%s:%d',
                            server.address().address, server.address().port);
                });
            } else {
                let wpPort = port + 1;
                createWebpackDevServer(host, wpPort)
                    .listen(wpPort, host, () => {
                        log('webpack dev server listening on http://localhost:%d',
                            wpPort);
                    });
            }
        } else {
            const server = app.listen(port, host, () => {
                log('server listening on http://%s:%d',
                        server.address().address, server.address().port);
            });
        }
    });

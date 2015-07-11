import express from 'express';
import { graphql } from 'graphql';
import { getSchema } from './BudgetSchema';
import debug from 'debug';
import bodyParser from 'body-parser';
import Database from './Database';
import createWebpackDevServer from './createWebpackDevServer';
import path from 'path';
import serveStatic from 'serve-static';

Database.get()
    .then(db => getSchema(db))
    .then(schema => {
        const log = debug('hdo-budget:app');
        const app = express();

        app.use(bodyParser.text({type: 'application/graphql'}))
        app.get('/', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../../public/index.html'));
        });

        app.post('/query', (req, res) => {
            graphql(schema, req.body).then(
                result => res.json(result),
                err    => res.status(500).json(err)
            );
        });

        const host = '0.0.0.0';
        const port = process.env.HTTP_PORT || 3000;


        if (process.env.NODE_ENV !== 'production') {
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
                    })
            }
        } else {
            const server = app.listen(port, host, () => {
                log('server listening on http://%s:%d',
                        server.address().address, server.address().port);
            });

        }
    });

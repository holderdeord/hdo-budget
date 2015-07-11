import express from 'express';
import { graphql } from 'graphql';
import { getSchema } from './BudgetSchema';
import debug from 'debug';
import bodyParser from 'body-parser';
import Database from './Database';

Database.get()
    .then(db => getSchema(db))
    .then(schema => {
        const log = debug('hdo-budget:app');
        const app = express();

        app.use(bodyParser.text({type: 'application/graphql'}))

        app.post('/query', (req, res) => {
            graphql(schema, req.body).then(
                result => res.json(result),
                err    => res.status(500).json(err)
            );
        });

        const server = app.listen(process.env.HTTP_PORT || 3000, '0.0.0.0', () => {
            log('server listening on http://%s:%d',
                    server.address().address, server.address().port);
        });
    })

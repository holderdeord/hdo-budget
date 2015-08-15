import fs from 'fs';
import path from 'path';
import { getSchema } from '../BudgetSchema';
import { graphql }  from 'graphql';
import { introspectionQuery } from 'graphql/utilities';

graphql(getSchema(), introspectionQuery).then(result => {
    if (result.errors) {
        console.error('ERROR: ', JSON.stringify(result.errors, null, 2));
    } else {
        const file = path.join(__dirname, '../../../schema.json');

        fs.writeFileSync(
           file,
           JSON.stringify(result, null, 2)
        );

        console.log('wrote', file);
    }
});

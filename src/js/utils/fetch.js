import superagent from 'superagent';

export default function fetch(query) {
    return new Promise((resolve, reject) => {
        superagent
                .post('/query')
                .send(query.toString())
                .set('Content-Type', 'application/x-graphql')
                .set('Accept', 'application/json')
                .end((err, res) => err ? reject(err) : resolve(res.body));
    });
}

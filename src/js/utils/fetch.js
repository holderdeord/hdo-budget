import superagent from 'superagent';

export default function fetch(query, params = {}) {
    return new Promise((resolve, reject) => {
        superagent
                .post('/query')
                .send({query: query, params: params})
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .end((err, res) => err ? reject(err) : resolve(res.body));
    });
}

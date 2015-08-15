import fetch from 'isomorphic-fetch';

function checkError(res) {
    if (res.status !== 200) {
        throw new Error(res.statusText);
    } else {
        return res;
    }
}

export default function(query, variables = {}) {
    return fetch('/graphql', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({query, variables})
    })
        .then(checkError)
        .then(res => res.json());
}

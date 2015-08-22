import Promise from 'bluebird';

function streamToPromise(stream) {
    return new Promise((resolve, reject) => {
        stream.on("end", resolve);
        stream.on("error", reject);
    });
}

export default streamToPromise;
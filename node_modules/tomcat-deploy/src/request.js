import { request } from 'http';


export default options => new Promise((resolve, reject) => {
  let responseData = '';

  const req = request(options, (res) => {
    res.on('data', (chunk) => { responseData += chunk; });
    res.on('end', () => {
      if (/^OK.*$/m.test(responseData)) {
        return resolve(responseData);
      }

      return reject(new Error(responseData));
    });
  });
  req.on('error', error => reject(new Error(error)));
  req.end();
});

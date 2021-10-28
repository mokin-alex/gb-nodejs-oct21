const fs = require('fs');
const readline = require('readline');
const ACCESS_LOG = './access.log';
//const ACCESS_LOG = './access1000.log';
const IPs = ['34.48.240.111', '89.123.1.41'];

const readStream = fs.createReadStream(
    ACCESS_LOG,
    {
        flags: 'r',
        encoding: 'utf-8',
    });

const rl = readline.createInterface({
    input: readStream
});

readStream.on('open', () => {
    console.log(new Date()+ '  File opened!');
});
readStream.on('end', () => {
    console.log(new Date()+'  Finished!');
});
readStream.on('error', (err) => {
    console.log(err);
});

IPs.forEach(ip => {
    rl.on('line', (logstring) => {
        if (logstring.includes(ip)) {
            const writeStream = fs.createWriteStream(`${ip}_requests.log`, {
                flags: 'a',
            });
            writeStream.write(`${logstring}\n`);
        }
    })
})
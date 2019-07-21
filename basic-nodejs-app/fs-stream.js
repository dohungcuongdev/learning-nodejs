const fs = require('fs');
const zlib = require('zlib');
const readStream = readStream2 = readStream3 = fs.createReadStream('./abc/a.txt', 'utf8');
const writeStream = fs.createWriteStream('./abc/b.txt');
const writeStream2 = fs.createWriteStream('./abc/c.txt');

// read each part of content as chunk (buffer) without waiting for the whole content of the file loaded
// compare to using readfile/writefile
// pros: saving memory
// cons: performane
readStream.on('data', chunk => {
    console.log(chunk);
    writeStream.write(chunk);
})

// short-hand version of the above
readStream2.pipe(writeStream2);

// zip file
const gzip = zlib.createGzip();
const writeStream3 = fs.createWriteStream('./abc/d.txt.gz');
readStream3.pipe(gzip).pipe(writeStream3);

// after zip file done => writeStream3 close then do logic unzip file
writeStream3.on('close', function() {
    // unzip file
    const gUnzip = zlib.createGunzip();
    const readStream4 = fs.createReadStream('./abc/d.txt.gz');
    const writeStream4 = fs.createWriteStream('./abc/uncompressed.txt');
    readStream4.pipe(gUnzip).pipe(writeStream4);
})
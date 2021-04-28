/*const { spawn } = require('child_process');
const got = require('got');
const test = require('tape');

// Start the app
const env = Object.assign({}, process.env, {PORT: 5000});
const child = spawn('node', ['index.js'], {env});

test('responds to requests', (t) => {
  t.plan(4);

  // Wait until the server is ready
  child.stdout.on('data', _ => {
    // Make a request to our app
    (async () => {
      const response = await got('http://127.0.0.1:5000');
      // stop the server
      child.kill();
      // No error
      t.false(response.error);
      // Successful response
      t.equal(response.statusCode, 200);
      // Assert content checks
      t.notEqual(response.body.indexOf("<title>Node.js Getting Started on Heroku</title>"), -1);
      t.notEqual(response.body.indexOf("Getting Started on Heroku with Node.js"), -1);
    })();
  });
});*/

/*let stringdata = JSON.stringify(data)
var json =  JSON.parse(stringdata); 
stringdata = JSON.stringify(data)*/
let data ="welcome Dr sharf in our QR test ,\n" + "user Serial Number: 95954"

const QRCode = require('qrcode')
QRCode.toDataURL(data, function (err, url) {
  if(err) return console.log(err)
  console.log(url)
})

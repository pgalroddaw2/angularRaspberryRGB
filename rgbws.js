const express = require('express');
const app = express()
const path = require('path');
const router = express.Router();


const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 8080;
var Gpio = require('pigpio').Gpio //include pigpio to interact with the GPIO
var ledRed = new Gpio(4, {mode: Gpio.OUTPUT}) //use GPIO pin 4 as output for RED
var ledGreen = new Gpio(17, {mode: Gpio.OUTPUT}) //use GPIO pin 17 as output for GREEN
var ledBlue = new Gpio(27, {mode: Gpio.OUTPUT}) //use GPIO pin 27 as output for BLUE
var redRGB = 255 //set starting value of RED variable to off (255 for common anode)
var greenRGB = 255 //set starting value of GREEN variable to off (255 for common anode)
var blueRGB = 255; //set starting value of BLUE variable to off (255 for common anode)

//RESET RGB LED
ledRed.digitalWrite(0); // Turn RED LED off
ledGreen.digitalWrite(0); // Turn GREEN LED off
ledBlue.digitalWrite(0); // Turn BLUE LED off

//http.listen(8080); //listen to port 8080

//function handler (req, res) { //what to do on requests to port 8080
//  fs.readFile(__dirname + '/public/rgb.html', function(err, data) { //read file rgb.html in public folder
//    if (err) {
//      res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
//      return res.end("404 Not Found");
//    }
//    res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
//    res.write(data); //write data from rgb.html
//    return res.end();
//  });
//}

app.get('/', function (req, res) {
  console.log("Cargando HOME");
  res.sendFile(path.join(__dirname + '/index.html'));
});

// Abrir puertos de escucha del servidor
server.listen(port, function () {
  console.log(`Listening on port ${port}`);
});



app.use('/', router);
app.use(express.static('./'));
//app.use(express.static('./socket.io'));
console.log('Escuchando en puerto 8080');

io.on('connection', function (socket) {// Web Socket Connection
  console.log("wenas");
  socket.on('rgbLed', function(data) { //get light switch status from client
    console.log(data); //output data from WebSocket connection to console

    //for common anode RGB LED  255 is fully off, and 0 is fully on, so we have to change the value from the client
    redRGB=255-parseInt(data.red);
    greenRGB=255-parseInt(data.green);
    blueRGB=255-parseInt(data.blue);

    console.log("rbg: " + redRGB + ", " + greenRGB + ", " + blueRGB); //output converted to console

    ledRed.pwmWrite(redRGB); //set RED LED to specified value
    ledGreen.pwmWrite(greenRGB); //set GREEN LED to specified value
    ledBlue.pwmWrite(blueRGB); //set BLUE LED to specified value
  });
});

process.on('SIGINT', function () { //on ctrl+c
  ledRed.digitalWrite(1); // Turn RED LED off
  ledGreen.digitalWrite(1); // Turn GREEN LED off
  ledBlue.digitalWrite(1); // Turn BLUE LED off
  console.log("Salida");
  process.exit(); //exit completely
});
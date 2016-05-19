var ev3dev = require('../bin/index.js');

var motor = new ev3dev.Motor(ev3dev.OUTPUT_A);
if(!motor.connected) {
    console.error("No motor was found on port A. Please connect a tacho motor to port A and try again.");
    process.exit(1);
}

motor.runForDistance(180, 500, 'brake');

console.log("Running the motor for 180 tacho counts...");

// Prevent Node from exiting until motor is done
var cancellationToken = setInterval(function() {
    if(motor.state.indexOf("running") == -1)
        clearInterval(cancellationToken);
}, 10);
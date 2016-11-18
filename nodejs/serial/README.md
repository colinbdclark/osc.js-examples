#Node.js Serial Example 

A simple implementation to illustrate the node.js binding to the serial port. 

1. Load the arduino sketch onto your arduino or teensy. Find it in the [utils](../utils/arduino/ArduinoOSCSender/) folder.

2. Finding the serial port listing on your system.

```
    %> ls /dev/cu.*
```

3. Run `npm install` in the terminal to install all require dependencies.

4. Run the index.js with the serial port number you found in 2.

```
    %> node index.js /dev/cu.yourserialdevice
```

You should now see messages streaming to the console. 

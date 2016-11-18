A simple implementation to illustrate the node.js binding to the serial port. 

1. Load the arduino sketch onto your arduino or teensy. 

2. Finding the serial port listing on your system

```
    %> ls /dev/cu.*
```

3. Run the index.js with the serial port number you found in 2.

```
    %> node index.js /dev/cu.yourserialdevice
```

You should now see messages streaming to the console. 

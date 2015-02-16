# Bi-directional UDP <-> web browser example

This example opens a Web Socket in a web page that communicates with a Node.js server.
The server is responsible for relaying OSC messages bidirectionally between the web page and set of
example Python scripts.

## Installation

From the command line:
1. Run <pre>npm install</pre>
2. In the <pre>web</pre> folder, run <pre>bower install</pre>
3. Use <pre>pip</pre> to install pyosc: <pre>sudo pip install pyosc --pre</pre>

## Running the Demo

1. In the <pre>udp-browser</pre> folder, start the Node.js server: <pre>node index.js</pre>
2. In <pre>web</pre> folder, open index.html in a web browser; a log will printed to the terminal when you have connected
3. To send an OSC message via UDP to the browser, run <pre>python testSend.py</pre> in a new terminal window; an OSC message should appear in the web browser window
4. To send an OSC message from the browser to the UDP socket, run <pre>python testReceive.py</pre>. This will start a Python-based UDP OSC server. Then in the browser, click the 'Send OSC message' button. An OSC message should appear in the terminal window runing testReceive.py.

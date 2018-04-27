# Bi-directional UDP <-> web browser example

This example opens a Web Socket in a web page that communicates with a Node.js server.
The server is responsible for relaying OSC messages bidirectionally between the web page and set of
example Python scripts.

## Installation

From the command line:
1. Run <code>npm install</code>
2. In the <code>web</code> folder, run <code>npm install</code>
3. Use [pip](https://pypi.python.org/pypi/pip) to install pyosc: <code>sudo pip install pyosc --pre</code>
** On Mac OS X, pip can be easily installed using the command <code>sudo easy_install pip</code>.

## Running the Demo

1. In the <code>udp-browser</code> folder, start the Node.js server: <code>node .</code>
2. In <code>web</code> folder, open index.html in a web browser; a log message will be printed to the terminal when you have connected.
3. To send an OSC message via UDP to the browser, run <code>python testSend.py</code> in a new terminal window; an OSC message should appear in the web browser window.
4. To send an OSC message from the browser to the UDP socket, run <code>python testReceive.py</code>. This will start a Python-based UDP OSC server. Then in the browser, click the 'Send OSC message' button. An OSC message should appear in the terminal window where you ran testReceive.py.

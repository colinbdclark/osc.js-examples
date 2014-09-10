## UPD <-> web browser example

This example opens two web sockets in a web page that communicate to the index.js file. 

#### To Install:

1. In *UDP<->browser* folder, use command line and run <pre>npm install</pre>
2. In *web* folder, use command line and run <pre>bower install</pre>
3. If you want to use the supplied Python test files for the UDP end; then use pip to install pyosc <pre>sudo pip install pyosc --pre</pre>

#### To Test:

1. In *UDP<->browser* folder, Use command line and run <pre>node index.js</pre>
2. In *web* folder, open index.html in web browser, notice that the terminal window will state that you have connected. 
3. For UDP->browser, in *UDP<->browser* folder, use command line in a new terminal window and run <pre>python testSend.py</pre> An OSC message should appear in the web browser window.
4. For browser->UDP, in *UDP<->browser* folder, use command line and run <pre>python testReceive.py</pre> This will start a UDP server. Then in the browser, click the 'Send OSC message' button. An OSC message should appear in the terminal window runing testReceive.py.

#### Additionally:

There is probably a cleaner way to make this all work with one websocket in the browser instead of two. And, one websocket in index.js instead of two. 
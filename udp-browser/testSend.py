import optparse
from OSC import *
from OSC import _readString, _readFloat, _readInt

c = OSCClient()
c.connect(('127.0.0.1',7400))
print c

m = OSCMessage("/test")
m += [44, 11, 4.5, "the white cliffs of dover"]

c.send(m)

c.close()

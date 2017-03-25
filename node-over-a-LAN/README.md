### sending UDP over a LAN ###

The main difference when sending between multiple computers over a LAN is that the "localAddress" property of each computer must use that computer's network address, **not** "127.0.0.1" or "localhost" or any other normal equivalent.

Run these simple examples on two machines over a LAN, substituting actual network names for the demo names "computerA.local" and "compuberB.local".



#include <OSCMessage.h>

#if defined(CORE_TEENSY)
#include <SLIPEncodedUSBSerial.h>
#else
#include <SLIPEncodedSerial.h>
#endif

#if defined(CORE_TEENSY)
SLIPEncodedUSBSerial SLIPSerial(Serial);
#else
SLIPEncodedSerial SLIPSerial(Serial);
#endif

void setup() {
  Serial.begin(9600); // Rate is ignored for USB devices such as the Teensy.
}

void loop() {

  String address = String("/knobs/0");
  int addressLength = address.length() + 1;
  char addressBuffer[addressLength];

  address.toCharArray(addressBuffer, addressLength);
  OSCMessage msg(addressBuffer);
  msg.add(random(100)/100.0);

  msg.send(SLIPSerial);
  SLIPSerial.endPacket();
  msg.empty();
  
  delay(1000);
  
}



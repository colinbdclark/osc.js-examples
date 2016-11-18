# Node.js Serial and UDP Example

This example illustrates a Node.js application that accepts OSC messages
from the serial port and a UDP socket (listening on port 57121).

## OSC Messages Over UDP
By default, this example is configured to handle OSC messages via from Lemur's AB Faderlab project.
It maps four parameters of a simple Flocking-based FM synthesizer to the first four
faders in the Lemur project. Here is the mapping:

<table>
    <tr>
        <th>OSC Address</th>
        <th>OSC Argument Type</th>
        <th>Synth Paramter</th>
    </tr>
    <tr>
        <td>/fader1/out</td>
        <td>float 0.0 - 1.0</td>
        <td>carrier frequency</td>
    <tr>
    <tr>
        <td>/fader2/out</td>
        <td>float 0.0 - 1.0</td>
        <td>carrier amplitude</td>
    <tr>
    <tr>
        <td>/fader3/out</td>
        <td>float 0.0 - 1.0</td>
        <td>modulator frequency</td>
    <tr>
    <tr>
        <td>/fader4/out</td>
        <td>float 0.0 - 1.0</td>
        <td>modulator amplitude</td>
    <tr>
</table>

If you don't have a copy of Lemur, you can use the SuperCollider test client created by [Jascha Narveson](https://github.com/jaschanarveson), which is located in the [utils](../utils/supercollider-lemur-faderlab-style-client.scd) directory.

## OSC Messages Over Serial
This example also listens for OSC messages over the serial port (which can be specified as the first argument to Node.js when starting the server). Here is the mapping:

<table>
    <tr>
        <th>OSC Address</th>
        <th>OSC Argument Type</th>
        <th>Synth Paramter</th>
    </tr>
    <tr>
        <td>/knobs/0</td>
        <td>float 0.0 - 1.0</td>
        <td>carrier frequency</td>
    <tr>
    <tr>
        <td>/knobs/1</td>
        <td>float 0.0 - 1.0</td>
        <td>carrier amplitude</td>
    <tr>
    <tr>
        <td>/knobs/2</td>
        <td>float 0.0 - 1.0</td>
        <td>modulator frequency</td>
    <tr>
    <tr>
        <td>/knobs/3</td>
        <td>float 0.0 - 1.0</td>
        <td>modulator amplitude</td>
    <tr>
</table>

## Installing and Running the Example

0. Run <code>npm install</code> in the terminal to install all required dependencies
1. Run <code>node .</code> to start the Node.js application
2. Control the synth using OSC messages sent from Lemur, another source of OSC messages sent via UDP, or via a serial device that sends OSC messages (such as an Arduino project)

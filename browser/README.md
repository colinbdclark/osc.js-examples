# UDP -> Web Socket Example

This example illustrates a Node.js server that will relay OSC messages sent via
a UDP socket (listening on port 57121) to a web page using a Web Socket connection.

By default, it is configured to handle OSC messages via UDP from Lemur's AB Faderlab project.
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

## Installation

1. Run <code>npm install</code> in the terminal to install all required Node dependencies
2. In the <code>web</code> directory, run <code>bower install</code</code> to install all web dependencies

## Running the Example

1. Run <code>node .</code> in the Terminal
2. Open <code>http://localhost:8081</code> in your browser
3. Control the synth using OSC messages sent from Lemur or another OSC server

'use strict';

require('dotenv').config();

const TPXapi = require('./endpoint');
const KasaControl = require('kasa_control');
const kasa = new KasaControl();

var endpoint = {
    username: process.env.TPADMIN,
    password: process.env.TPADMINPWD,
    ipAddress: process.env.IPADDRESS,
}

const email = process.env.KASAEMAIL;

const password = process.env.KASAPASSWORD;

const kasaLightId = process.env.KASALIGHT;

var tp = new TPXapi(endpoint);

tp.on('status', (report) => {
    console.log(report);
    if(report.state === 'lights'){
        if(report.status === 'on'){
            lights(true);
        }else{
            lights(false);
        }
    }else{
        if(report.status === 'increment'){
            console.log("dimmer up");
            //to be done
        }else{
            console.log("dimmer down");
            //to be done
        }
    }

});

async function lights(state) {
    await kasa.login(email, password);
    const devices = await kasa.power(kasaLightId,state);

    console.log(devices);
}
process.on('SIGINT', function() {
    console.log('server : stoppping...');
    process.exit();
});
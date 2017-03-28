const icingaapi = require('./index')

const monUrl = process.env.MONITORING_API_URL;
const monAPIPort = process.env.MONITORING_API_PORT;
const monAPIUser = process.env.MONITORING_API_USER;
const monAPIPass = process.env.MONITORING_API_PASS;
const templatehost = process.env.TEMPLATEHOST;
const templateservice = process.env.TEMPLATESERVICE;
const hostgroup = process.env.HOSTGROUP;
const servicegroup = process.env.SERVICEGROUP

console.log({
    "monURL": monUrl,
    "monAPIPort": monAPIPort,
    "monAPIUser": monAPIUser,
    "monAPIPass": monAPIPass
})

var icingaServer = new icingaapi(monUrl, monAPIPort, monAPIUser, monAPIPass);

//check if host "icinga2" exist;
icingaServer.getHostState("icinga2", function (err, result) {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
})

//get one or more hosts, filtered var is "icinga2"
icingaServer.getHostFiltered({
    "filter": "host.vars.server == server",
    "filter_vars": {
        "server": "icinga2"
    }
}, "local", function (err, result) {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
})

//get service with state = 0;
icingaServer.getServiceWithState(0, function (err, services) {
    if (err) {
        console.log(err);
    } else {
        for (var i = 0; i < services.length; i++) {
            var serverServiceSplit = services[i].name.split("!");

            if (serverServiceSplit[1].match(/^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/)) {
                icingaServer.getService(serverServiceSplit[0], serverServiceSplit[1], function (err, service) {
                    console.log(err);
                    console.log(service);
                })
            }
        }
    }
})

//create a host on icinga2
icingaServer.createHost("passive-host", "4demo", "4Demo Server", "adito", servername, function (err, result) {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
});

//create a service on host "4demo";
icingaServer.createService("passive-service", "4demo", "topService", "Top Service", "adito", "dockerdmz", function (err, result) {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
})

//create a host with custom variables
var hostBody = JSON.stringify({
    "templates": ["passive-host"],
    "attrs": {
        "display_name": "4Demo Server",
        "vars.group": "adito",
        "vars.server": "dockerdmz"
    }
})
icingaServer.createHostCustom(hostBody, "4demo2", function (err, result) {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
})

//create a service with custom vars;
var serviceBody = JSON.stringify({
    "templates": ["passive-service"],
    "attrs": {
        "display_name": "Service Top",
        "vars.group": "adito",
        "vars.server": "dockerdmz"
    }
})

icingaServer.createServiceCustom(serviceBody, "4demo", "top", function (err, result) {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
})

//delete a host;
icingaServer.deleteHost("4demo", function (err, result) {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
})

//delete a service
icingaServer.deleteService("topService", "4demo", function (err, result) {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
})

//set state of a host
icingaServer.setHostState("4demo", "0", function (err, result) {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
});

//set state of a service
icingaServer.setServiceState("topService", "4demo", "0", function (err, result) {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
});

//set downtime for filtered hosts
//it will set downtime where custom war was set to "4demo" ,this is helpfull if you use docker containers
var setDownTimeObject = {
    'type': 'Host',
    'start_time': actTime,
    'end_time': endtime,
    'author': 'icingaadmin',
    'comment': "Downtime for Backup",
    'filter': 'host.vars.server == server',
    'filter_vars': {
        'server': "4demo"
    }
}

icingaServer.setFilteredDowntime(setDownTimeObject, function (err, data) {
    if (err) {
        console.log("Downtime for Doker Host: " + target + " was not set. State: " + err.StatusCode + ". Message: " + err.StatusMessage);
        process.exit(1);
    } else {
        console.log("Downtime for Docker Host: " + target + " was set (" + duration + "sec.). State: " + data.StatusCode);
    }
})

//remove downtime from a host, it is also apply by a filter
icingaServer.removeFilteredDowntime(setDownTimeObject, function (err, data) {
    if (err) {
        console.log("Downtime for Doker Host: " + target + " was not set. State: " + err.StatusCode + ". Message: " + err.StatusMessage);
        process.exit(1);
    } else {
        console.log("Downtime for Docker Host: " + target + " was set (" + duration + "sec.). State: " + data.StatusCode);
    }
})

//disable host notification
icingaServer.disableHostNotification("4demo", function (err, result) {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
});

//get host state
icingaServer.getHostState("4demo", function (err, result) {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
});

//set perdate for a service
var perfdataArr = ["Memory in %=" + memUsedinPerc + "%;" + aditoMemWarn + ";" + aditomemErr + ";0"]

icingaServer.setServicePerfdata("aditoServerMem", icingaHost, state, stateout, perfdataArr, function (err, output) {
    if (err) {
        logger.error(err);
    } else {

        logger.debug("Send perdata of aditoServerMem to icinga");

    }
})

//update host attributs
icingaServer.updateHostAttr(JSON.stringify({
    "templates": [icingaConf.templatehost],
    "attrs": {
        "display_name": "Adito Server Public",
        "vars.group": "adito",
        "vars.AditoServerName": "aditoServer",
        "vars.AditoServerVersion": "4.6.34",
        "vars.AditoStartupTime": "Mo.",
        "vars.CPUs": "4"
    }
}), icingaHost, function (err, output){
    if(err){
        console.log(err);
    } else {
        console.log(output);
    }
})
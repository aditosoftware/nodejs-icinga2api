# icinga2
Icinga2 Remote api module
[Icinga2 api doc](https://docs.icinga.com/icinga2/latest/doc/module/icinga2/chapter/icinga2-api)
## Installation

    npn install icinga2-api
    
### Getting started
``` js
const icingaapi = require('icinga2-api')
var icingaServer = new icingaapi("https://icingas2server.local", "5665", "apiUser", "apiUserPass");
    icingaServer.getHostState("icinga2", function (err, result) {
        if (err) {
            if (err.Statuscode == "404") {
                console.log("Host icinga2 on monitoring was not found, create one");
                
                //create a host on icinga2
                icingaServer.createHost("passive-host", "4demo", "4Demo Server", "adito", servername, function (err, result) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("Host icinga2 was created successfull");
                    }
                });
            }
            console.error(err);
        } else {
            console.log(result);
        }
    })
```
## Methods
 - getServices = function (callback)
 - getService = function (ServerName, ServiceName, callback)
 - getHosts = function (callback)
 - getHost = function (ServerName, callback)
 - getHostFiltered = function (filter, callback)
 - getServiceWithState = function (state, callback)
 - createHost = function (template, host, displayname, gruppe, onServer, callback)
 - createService = function (template, host, service, displayname, gruppe, onServer, callback)
 - createServiceCustom = function (serviceObj, host, service, callback)
 - createHostCustom = function (hostObj, host, callback)
 - deleteHost = function (host, callback)
 - deleteService = function (service, host, callback)
 - setHostDowntime = function (dObj, hostname, callback)
 - setFilteredDowntime = function (dFilter, callback)
 - removeFilteredDowntime = function (dFilter, callback)
 - disableHostNotification = function (hostname, callback)
 - setHostState = function (host, hostState, StateMessage, callback)
 - setServiceState = function (service, host, serviceState, serviceMessage, callback)
 - getHostState = function (hostName, callback)
 - setServicePerfdata = function (service, server, state, output, perfarr, callback)
 - setHostPerfdata = function (server, state, output, perfarr, callback)
 - updateHostAttr = function (hostObj, host, callback)
 - updateServiceAttr = function (serviceObj, host, service, callback)

## Examples
Check test.js for more details